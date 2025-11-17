<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { SvelteMap } from "svelte/reactivity";
    import {
        Check,
        CircleAlert,
        FileImage,
        LoaderCircle,
        Upload,
        Video,
        X,
    } from "@lucide/svelte";
    import { upload } from "@vercel/blob/client";
    import { createThumbnail } from "$lib/helpers/create-thumbnail";

    type Status = "pending" | "uploading" | "success" | "error";
    let fileInput: HTMLInputElement;
    let dragActive = $state(false);

    let files = $state(
        new SvelteMap<
            string,
            {
                id: string;
                file: File;
                status: Status;
                progress: number;
                controller: AbortController;
                isThumbnail?: boolean;
            }
        >(),
    );

    const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250MB
    const ACCEPTED_TYPES = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/heic",
        "image/heif",
        "video/mp4",
        "video/mpeg",
        "video/quicktime",
        "video/webm",
        "video/avi",
    ];

    function handleDragEnter(e: DragEvent) {
        e.preventDefault();
        dragActive = true;
    }

    function handleDragLeave(e: DragEvent) {
        e.preventDefault();
        dragActive = false;
    }

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
    }

    async function handleDrop(e: DragEvent) {
        e.preventDefault();
        dragActive = false;

        if (e.dataTransfer?.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            await addFiles(droppedFiles);
        }
    }

    async function handleFileSelect(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            const selectedFiles = Array.from(target.files);
            await addFiles(selectedFiles);
        }
    }

    async function addFiles(newFiles: File[]) {
        const validFiles = newFiles.filter((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                alert(`Datei ${file.name} hat ein nicht unterstütztes Format`);
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert(`Datei ${file.name} ist zu groß (max. 250MB)`);
                return false;
            }
            return true;
        });

        // Initialize status for new files
        for (const file of validFiles) {
            const id = crypto.randomUUID();
            if (file.type.startsWith("video/")) {
                try {
                    const thumbBlob = await createThumbnail(file);
                    const thumbFile = new File(
                        [thumbBlob],
                        `thumbnail-${file.name.split(".")[0]}.webp`,
                        { type: thumbBlob.type },
                    );

                    files.set(thumbFile.name, {
                        id,
                        file: thumbFile,
                        status: "pending",
                        controller: new AbortController(),
                        progress: 0,
                        isThumbnail: true,
                    });
                } catch (error) {
                    // TODO! handle error here
                }
            }

            files.set(file.name, {
                id,
                file,
                status: "pending",
                controller: new AbortController(),
                progress: 0,
            });
        }
    }

    function removeFile(fileToRemove: File) {
        const file = files.get(fileToRemove.name);
        file?.controller.abort();

        files.delete(fileToRemove.name);
    }

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    async function uploadFiles() {
        if (files.size === 0) {
            return;
        }

        for (const [name, props] of files) {
            if (props.status === "success") {
                continue;
            }

            files.set(name, {
                ...props,
                status: "uploading",
            });

            try {
                const response = await upload(name, props.file, {
                    clientPayload: JSON.stringify({
                        id: props.id,
                        isThumbnail: props.isThumbnail,
                    }),
                    access: "public",
                    handleUploadUrl: "/api/upload",
                    onUploadProgress: (ctx) => {
                        const currentFile = files.get(name);
                        if (currentFile) {
                            files.set(name, {
                                ...currentFile,
                                progress: ctx.percentage,
                            });
                        }
                    },
                    abortSignal: props.controller.signal,
                });

                files.set(name, { ...props, status: "success" });

                if (!response.url) {
                    throw new Error("Failed to get upload token");
                }
            } catch (error) {
                files.set(name, { ...props, status: "error" });
            }
        }
    }

    function clearAll() {
        files.clear();
    }

    function openFileDialog() {
        fileInput.click();
    }
</script>

<svelte:head>
    <title>Bilder hochladen</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Bilder hochladen</h1>
        <p class="text-muted-foreground">
            Laden Sie Ihre Bilder und Videos hoch. Bilder und Videos bis zu
            250MB werden unterstützt.
        </p>
    </div>

    <!-- Hidden file input -->
    <input
        bind:this={fileInput}
        type="file"
        multiple
        accept="image/*,video/*"
        onchange={async (f) => await handleFileSelect(f)}
        class="hidden"
    />

    <!-- Upload Area -->
    <div class="mb-8">
        <div
            class="border-2 border-dashed rounded-lg p-8 text-center transition-colors {dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'}"
            ondragenter={handleDragEnter}
            ondragleave={handleDragLeave}
            ondragover={handleDragOver}
            ondrop={async (f) => await handleDrop(f)}
            role="button"
            tabindex="0"
            onclick={openFileDialog}
            onkeydown={(e) => e.key === "Enter" && openFileDialog()}
        >
            <Upload class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-medium mb-2">
                Dateien hier ablegen oder klicken zum Durchsuchen
            </h3>
            <p class="text-muted-foreground mb-4">
                Unterstützung für Bilder (JPEG, PNG, GIF, WebP, HEIC) und Videos
                (MP4, MOV, WebM, AVI)
            </p>
            <p class="text-sm text-muted-foreground">
                Maximale Dateigröße: 250MB
            </p>
        </div>
    </div>

    <!-- File List -->
    {#if files.size > 0}
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">
                    Ausgewählte Dateien ({files.size})
                </h2>
                <div class="space-x-2 flex items-center">
                    <Button variant="outline" size="sm" onclick={clearAll}>
                        Alle löschen
                    </Button>
                    <Button
                        size="sm"
                        onclick={uploadFiles}
                        disabled={Object.values(
                            Object.fromEntries(files),
                        ).every((f) => f.status === "success")}
                    >
                        Dateien hochladen
                    </Button>
                </div>
            </div>

            <div class="space-y-3">
                {#each files as [name, { file, status, progress }] (name)}
                    {#if name.startsWith("thumbnail-")}
                        {null}
                    {:else}
                        <div
                            class="flex items-center space-x-4 p-4 border rounded-lg bg-card"
                        >
                            <div class="flex-shrink-0">
                                {#if file.type.startsWith("image/")}
                                    <FileImage class="h-8 w-8 text-blue-500" />
                                {:else}
                                    <Video class="h-8 w-8 text-purple-500" />
                                {/if}
                            </div>

                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium truncate">
                                    {file.name}
                                </p>
                                <p class="text-xs text-muted-foreground">
                                    {formatFileSize(file.size)}
                                </p>

                                {#if status === "uploading"}
                                    <div class="mt-2">
                                        <div
                                            class="w-full bg-muted rounded-full h-2"
                                        >
                                            <div
                                                class="bg-primary h-2 rounded-full transition-all duration-300"
                                                style="width: {progress || 0}%"
                                            ></div>
                                        </div>
                                        <p
                                            class="text-xs text-muted-foreground mt-1"
                                        >
                                            Wird hochgeladen... {progress || 0}%
                                        </p>
                                    </div>
                                {/if}
                            </div>

                            <div class="flex items-center space-x-2">
                                {#if status === "success"}
                                    <Check class="size-5 text-green-500" />
                                {:else if status === "error"}
                                    <CircleAlert class="size-5 text-red-500" />
                                {:else if status === "uploading"}
                                    <LoaderCircle class="size-5 animate-spin" />
                                {/if}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onclick={() => removeFile(file)}
                                >
                                    <X class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

    <!-- Upload Statistics -->
    {#if files.size > 0}
        <div class="bg-muted/50 rounded-lg p-4">
            <h3 class="font-medium mb-2">Zusammenfassung</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <span class="text-muted-foreground">Dateien gesamt:</span>
                    <span class="font-medium ml-2"
                        >{files.size -
                            Object.values(Object.fromEntries(files)).filter(
                                (f) => f.file.type.startsWith("video/"),
                            ).length}</span
                    >
                </div>
                <div>
                    <span class="text-muted-foreground">Gesamtgröße:</span>
                    <span class="font-medium ml-2">
                        {formatFileSize(
                            Object.values(Object.fromEntries(files)).reduce(
                                (sum, f) => sum + f.file.size,
                                0,
                            ),
                        )}
                    </span>
                </div>
                <div>
                    <span class="text-muted-foreground">Hochgeladen:</span>
                    <span class="font-medium ml-2 text-green-600">
                        {Object.values(Object.fromEntries(files)).filter(
                            (f) => f.status === "success",
                        ).length}
                    </span>
                    /
                    <span class="font-medium text-red-600">
                        {Object.values(Object.fromEntries(files)).filter(
                            (f) => f.status === "error",
                        ).length} fehlgeschlagen
                    </span>
                </div>
            </div>
        </div>
    {/if}
</div>
