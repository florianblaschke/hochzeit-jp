<script lang="ts">
    import { cn } from "$lib/utils";
    import type { HTMLVideoAttributes } from "svelte/elements";

    let videoNode: HTMLVideoElement;

    let {
        id,
        src,
        class: className,
        type,
        activeSlide,
    }: HTMLVideoAttributes & {
        id: string;
        type: string;
        activeSlide: string | null;
    } = $props();

    $effect(() => {
        if (activeSlide !== id) {
            videoNode.pause();
        }
    });
</script>

<video
    bind:this={videoNode}
    controls
    playsinline
    preload="metadata"
    class={cn("max-w-full max-h-dvh object-contain select-none", className)}
>
    <source {src} {type} />
    <track default kind="captions" />
</video>
