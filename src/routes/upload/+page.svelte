<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        Upload,
        X,
        FileImage,
        Video,
        AlertCircle,
        Check,
    } from "@lucide/svelte";
    import { onMount } from "svelte";

    let fileInput: HTMLInputElement;
    let dragActive = false;
    let files: File[] = [];
    let uploadProgress: { [key: string]: number } = {};
    let uploadStatus: {
        [key: string]: "pending" | "uploading" | "success" | "error";
    } = {};

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

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        dragActive = false;

        if (e.dataTransfer?.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            addFiles(droppedFiles);
        }
    }

    function handleFileSelect(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            const selectedFiles = Array.from(target.files);
            addFiles(selectedFiles);
        }
    }

    function addFiles(newFiles: File[]) {
        const validFiles = newFiles.filter((file) => {
            if (!ACCEPTED_TYPES.includes(file.type)) {
                alert(`File ${file.name} is not a supported format`);
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large (max 250MB)`);
                return false;
            }
            return true;
        });

        files = [...files, ...validFiles];

        // Initialize status for new files
        for (const file of validFiles) {
            uploadStatus[file.name] = "pending";
            uploadProgress[file.name] = 0;
        }
    }

    function removeFile(fileToRemove: File) {
        files = files.filter((file) => file !== fileToRemove);
        delete uploadStatus[fileToRemove.name];
        delete uploadProgress[fileToRemove.name];
    }

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    function getFileIcon(file: File) {
        return file.type.startsWith("video/") ? Video : FileImage;
    }

    async function uploadFiles() {
        if (files.length === 0) return;

        // Simulate upload process
        for (const file of files) {
            if (uploadStatus[file.name] === "success") continue;

            uploadStatus[file.name] = "uploading";

            // Simulate upload progress
            for (let progress = 0; progress <= 100; progress += 10) {
                uploadProgress[file.name] = progress;
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            // Simulate random success/failure
            uploadStatus[file.name] = Math.random() > 0.1 ? "success" : "error";
        }
    }

    function clearAll() {
        files = [];
        uploadProgress = {};
        uploadStatus = {};
    }

    function openFileDialog() {
        fileInput.click();
    }
</script>

<svelte:head>
    <title>Upload Media</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Upload Media</h1>
        <p class="text-muted-foreground">
            Upload your images and videos. Images and videos up to 250MB are
            supported.
        </p>
    </div>

    <!-- Hidden file input -->
    <input
        bind:this={fileInput}
        type="file"
        multiple
        accept="image/*,video/*"
        on:change={handleFileSelect}
        class="hidden"
    />

    <!-- Upload Area -->
    <div class="mb-8">
        <div
            class="border-2 border-dashed rounded-lg p-8 text-center transition-colors {dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'}"
            on:dragenter={handleDragEnter}
            on:dragleave={handleDragLeave}
            on:dragover={handleDragOver}
            on:drop={handleDrop}
            role="button"
            tabindex="0"
            on:click={openFileDialog}
            on:keydown={(e) => e.key === "Enter" && openFileDialog()}
        >
            <Upload class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 class="text-lg font-medium mb-2">
                Drop files here or click to browse
            </h3>
            <p class="text-muted-foreground mb-4">
                Support for images (JPEG, PNG, GIF, WebP, HEIC) and videos (MP4,
                MOV, WebM, AVI)
            </p>
            <p class="text-sm text-muted-foreground">
                Maximum file size: 250MB
            </p>
        </div>
    </div>

    <!-- File List -->
    {#if files.length > 0}
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">
                    Selected Files ({files.length})
                </h2>
                <div class="space-x-2">
                    <Button variant="outline" size="sm" onclick={clearAll}>
                        Clear All
                    </Button>
                    <Button
                        onclick={uploadFiles}
                        disabled={files.every(
                            (f) => uploadStatus[f.name] === "success",
                        )}
                    >
                        Upload Files
                    </Button>
                </div>
            </div>

            <div class="space-y-3">
                {#each files as file (file.name + file.size)}
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

                            {#if uploadStatus[file.name] === "uploading"}
                                <div class="mt-2">
                                    <div
                                        class="w-full bg-muted rounded-full h-2"
                                    >
                                        <div
                                            class="bg-primary h-2 rounded-full transition-all duration-300"
                                            style="width: {uploadProgress[
                                                file.name
                                            ] || 0}%"
                                        ></div>
                                    </div>
                                    <p
                                        class="text-xs text-muted-foreground mt-1"
                                    >
                                        Uploading... {uploadProgress[
                                            file.name
                                        ] || 0}%
                                    </p>
                                </div>
                            {/if}
                        </div>

                        <div class="flex items-center space-x-2">
                            {#if uploadStatus[file.name] === "success"}
                                <Check class="h-5 w-5 text-green-500" />
                            {:else if uploadStatus[file.name] === "error"}
                                <AlertCircle class="h-5 w-5 text-red-500" />
                            {:else if uploadStatus[file.name] === "uploading"}
                                <div
                                    class="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"
                                ></div>
                            {/if}

                            <Button
                                variant="ghost"
                                size="sm"
                                onclick={() => removeFile(file)}
                                disabled={uploadStatus[file.name] ===
                                    "uploading"}
                            >
                                <X class="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Upload Statistics -->
    {#if files.length > 0}
        <div class="bg-muted/50 rounded-lg p-4">
            <h3 class="font-medium mb-2">Upload Summary</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <span class="text-muted-foreground">Total files:</span>
                    <span class="font-medium ml-2">{files.length}</span>
                </div>
                <div>
                    <span class="text-muted-foreground">Total size:</span>
                    <span class="font-medium ml-2">
                        {formatFileSize(
                            files.reduce((sum, file) => sum + file.size, 0),
                        )}
                    </span>
                </div>
                <div>
                    <span class="text-muted-foreground">Uploaded:</span>
                    <span class="font-medium ml-2 text-green-600">
                        {Object.values(uploadStatus).filter(
                            (status) => status === "success",
                        ).length}
                    </span>
                    /
                    <span class="font-medium text-red-600">
                        {Object.values(uploadStatus).filter(
                            (status) => status === "error",
                        ).length} failed
                    </span>
                </div>
            </div>
        </div>
    {/if}
</div>
