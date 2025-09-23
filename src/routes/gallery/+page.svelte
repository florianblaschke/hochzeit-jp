<script lang="ts">
    import { buttonVariants } from "$lib/components/ui/button";
    import { cn } from "$lib/utils";
    import { onMount } from "svelte";

    // Mock data for demonstration - replace with actual data source
    let images: string[] = [
        "https://picsum.photos/400/300?random=1",
        "https://picsum.photos/400/400?random=2",
        "https://picsum.photos/300/400?random=3",
        "https://picsum.photos/500/300?random=4",
        "https://picsum.photos/400/500?random=5",
        "https://picsum.photos/350/350?random=6",
        "https://picsum.photos/400/300?random=7",
        "https://picsum.photos/300/300?random=8",
        "https://picsum.photos/450/400?random=9",
        "https://picsum.photos/400/350?random=10",
        "https://picsum.photos/500/400?random=11",
        "https://picsum.photos/350/400?random=12",
        "https://picsum.photos/400/300?random=13",
        "https://picsum.photos/300/450?random=14",
        "https://picsum.photos/400/400?random=15",
        "https://picsum.photos/450/300?random=16",
        "https://picsum.photos/450/300?random=17",
        "https://picsum.photos/450/300?random=18",
        "https://picsum.photos/450/300?random=19",
        "https://picsum.photos/450/300?random=20",
        "https://picsum.photos/450/300?random=21",
        "https://picsum.photos/450/300?random=22",
        "https://picsum.photos/450/300?random=23",
    ];
    let loading = true;

    // Generate some placeholder images for demonstration
    onMount(() => {
        loading = false;
        // Mock loading delay
    });
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

    {#if loading}
        <div class="flex justify-center items-center py-16">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
        </div>
    {:else if images.length === 0}
        <div class="text-center py-16">
            <p class="text-muted-foreground text-lg">No images found</p>
        </div>
    {:else}
        <div class="flex gap-px" style="flex-wrap: wrap;">
            {#each images as image, index}
                <div class="relative aspect-auto">
                    <img
                        src={image}
                        alt="Gallery image {index + 1}"
                        class="w-full h-full object-cover transition-transform duration-200 ease-in-out cursor-pointer hover:scale-105"
                        loading="lazy"
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>
