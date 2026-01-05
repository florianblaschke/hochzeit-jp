<script lang="ts">
    import Image from "$lib/components/custom/image.svelte";
    import Video from "$lib/components/custom/video.svelte";
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
    let activeSlide = $state<string | null>(null);
    let allMedia = $state(data.media);
    let isLoading = $state(false);
    let hasMore = $derived(data.offset + allMedia.length < data.totalCount);
    let sentinelElement = $state<HTMLDivElement>();

    const count = $derived(
        carouselApi ? carouselApi.scrollSnapList().length : 0,
    );
    let current = $state(0);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;

        isLoading = true;
        try {
            const response = await fetch(
                `/api/gallery?offset=${data.offset + allMedia.length}`,
            );
            const newData = await response.json();
            allMedia = [...allMedia, ...newData.media];
        } catch (error) {
            console.error("Failed to load more media:", error);
        } finally {
            isLoading = false;
        }
    };

    $effect(() => {
        if (!sentinelElement) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { rootMargin: "200px" },
        );

        observer.observe(sentinelElement);
        return () => observer.disconnect();
    });

    $effect(() => {
        if (isOpen && carouselApi) {
            carouselApi.scrollTo(currentIndex, true);
            activeSlide = allMedia[currentIndex].id;
        }

        if (carouselApi) {
            current = carouselApi.selectedScrollSnap() + 1;
            carouselApi.on("select", () => {
                current = carouselApi!.selectedScrollSnap() + 1;
                activeSlide = allMedia[current - 1].id;

                // Load more images when reaching the last image
                if (current === allMedia.length - 5 && hasMore && !isLoading) {
                    loadMore();
                }
            });
        }
    });
</script>

<svelte:head>
    <title>Jana & Philipp – Galerie</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <div class="mb-8 flex items-center justify-between pt-16">
        <h1 class="text-3xl font-bold mb-2">Galerie</h1>
        <a href="/upload" class={cn(buttonVariants({ variant: "link" }))}>
            Bilder hochladen
        </a>
    </div>

    {#if allMedia.length === 0}
        <div class="text-center py-16">
            <p class="text-muted-foreground text-lg">
                Zur Zeit gibt es noch keine Bilder. <br />Ab dem 18.04.2026
                kannst du Bilder von der Hochzeit hier hochladen.
            </p>
        </div>
    {:else}
        <div class="flex gap-px md:gap-1" style="flex-wrap: wrap;">
            {#each allMedia as media, index}
                <button
                    type="button"
                    class="relative aspect-square basis-1/2 md:basis-1/4 max-w-[49%] md:max-w-[24.5%]"
                    onclick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        currentIndex = index;
                        isOpen = true;
                    }}
                    aria-label="Open image/video {index + 1}"
                >
                    <Image
                        height={44}
                        src={media.thumbnailUrl ?? media.mediaUrl}
                        alt="Gallery image {index + 1}"
                        class="group w-full h-full object-cover transition-transform duration-200 ease-in-out cursor-pointer hover:scale-[101%]"
                        loading="lazy"
                    />
                    {#if media.thumbnailUrl}
                        <div class="absolute inset-0 grid place-items-center">
                            <span
                                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
                            >
                                ▶
                            </span>
                        </div>
                    {/if}
                </button>
            {/each}
        </div>
        {#if hasMore}
            <div bind:this={sentinelElement} class="h-20"></div>
        {/if}
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
                        {#each allMedia as media, i}
                            <CarouselItem
                                class="h-screen flex items-center justify-center"
                            >
                                {#if media.type.startsWith("video/")}
                                    <Video
                                        {activeSlide}
                                        id={media.id}
                                        src={media.mediaUrl}
                                        type={media.type}
                                        poster={media.thumbnailUrl}
                                    />
                                {:else}
                                    <Image
                                        src={media.mediaUrl ?? ""}
                                        alt="Gallery image {i + 1}"
                                        class="max-w-full max-h-screen object-contain select-none"
                                        draggable="false"
                                    />
                                {/if}
                            </CarouselItem>
                        {/each}
                    </CarouselContent>
                    <CarouselPrevious class="left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext class="right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
                <p
                    class="absolute bottom-0 right-0 left-0 w-full bg-black opacity-60 py-2 flex items-center justify-center text-white text-sm"
                >
                    Bild {current} / {count}
                </p>
            </DialogContent>
        </Dialog>
    {/if}
</div>
