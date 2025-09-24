<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button";
    import { cn } from "$lib/utils";
    import type { PageData } from "./$types";
    import { Image } from "@unpic/svelte";

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Gallery</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold mb-2">Gallery</h1>
        <p class="text-muted-foreground">View all uploaded images</p>
        <a href="/upload" class={cn(buttonVariants({ variant: "link" }))}>
            Upload images
        </a>
    </div>

    {#if data.images.length === 0}
        <div class="text-center py-16">
            <p class="text-muted-foreground text-lg">No images found</p>
        </div>
    {:else}
        <div class="flex gap-1" style="flex-wrap: wrap;">
            {#each data.images as image, index}
                <div class="relative aspect-square size-40">
                    <Image
                        src={image.url ?? ""}
                        alt="Gallery image {index + 1}"
                        class="w-full h-full object-cover transition-transform duration-200 ease-in-out cursor-pointer hover:scale-[101%]"
                        loading="lazy"
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>
