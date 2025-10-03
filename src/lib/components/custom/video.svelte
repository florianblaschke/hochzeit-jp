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
    {src}
    controls
    preload="metadata"
    class={cn("max-w-full max-h-screen object-contain select-none", className)}
>
    <track default kind="captions" />
    <source {src} {type} />

    Download the
    <a href={src}>Video</a>
    here
</video>
