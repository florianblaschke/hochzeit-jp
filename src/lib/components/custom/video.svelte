<script lang="ts">
    import type { Media } from "$lib/server/db/schema";
    import { cn } from "$lib/utils";

    let { src, className }: { src: Media; className?: string } = $props();
</script>

<video
    controls
    src={src.url}
    class={cn("max-w-full max-h-screen object-contain select-none", className)}
>
    <track default kind="captions" />
    <source src={src.url} type={src.type} />

    Download the
    <a href={src.url}>Video</a>
    here
</video>
