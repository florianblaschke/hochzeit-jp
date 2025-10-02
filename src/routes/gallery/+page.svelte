<script lang="ts">
    import Image from "$lib/components/custom/image.svelte";
    import { buttonVariants } from "$lib/components/ui/button";
    import {
        Carousel,
        CarouselContent,
        CarouselItem,
        CarouselNext,
        CarouselPrevious,
    } from "$lib/components/ui/carousel";
    import type { CarouselAPI } from "$lib/components/ui/carousel/context";
    import { Dialog, DialogContent } from "$lib/components/ui/dialog";
    import { cn } from "$lib/utils";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    let isOpen = $state(false);
    let currentIndex = $state(0);
    let carouselApi = $state<CarouselAPI>();

    const count = $derived(
        carouselApi ? carouselApi.scrollSnapList().length : 0,
    );
    let current = $state(0);

    $effect(() => {
        if (isOpen && carouselApi) {
            carouselApi.scrollTo(currentIndex, true);
        }

        if (carouselApi) {
            current = carouselApi.selectedScrollSnap() + 1;
            carouselApi.on("select", () => {
                current = carouselApi!.selectedScrollSnap() + 1;
            });
        }
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

    {#if data.images.length === 0}
        <div class="text-center py-16">
            <p class="text-muted-foreground text-lg">No images found</p>
        </div>
    {:else}
        <div class="flex gap-1" style="flex-wrap: wrap;">
            {#each data.images as image, index}
                <button
                    type="button"
                    class="relative aspect-square size-40"
                    onclick={() => {
                        currentIndex = index;
                        isOpen = true;
                    }}
                    aria-label="Open image {index + 1}"
                >
                    <Image
                        height={44}
                        src={image.url ?? ""}
                        alt="Gallery image {index + 1}"
                        class="w-full h-full object-cover transition-transform duration-200 ease-in-out cursor-pointer hover:scale-[101%]"
                        loading="lazy"
                    />
                </button>
            {/each}
        </div>
        <Dialog bind:open={isOpen}>
            <DialogContent
                class="w-screen h-screen max-w-none rounded-none border-0 p-0 bg-black"
            >
                <Carousel
                    opts={{ loop: true }}
                    setApi={(api) => (carouselApi = api)}
                    class="w-screen h-screen"
                >
                    <CarouselContent class="h-screen">
                        {#each data.images as image, i}
                            <CarouselItem
                                class="h-screen flex items-center justify-center"
                            >
                                <Image
                                    src={image.url ?? ""}
                                    alt="Gallery image {i + 1}"
                                    class="max-w-full max-h-screen object-contain select-none"
                                    draggable="false"
                                />
                            </CarouselItem>
                        {/each}
                    </CarouselContent>
                    <CarouselPrevious class="left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext class="right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
                <p class="absolute top-2 right-50 text-white text-sm">
                    Bild {current} / {count}
                </p>
            </DialogContent>
        </Dialog>
    {/if}
</div>
