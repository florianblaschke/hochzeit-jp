<script lang="ts">
    import { optimize, optimizeSingle } from "$lib/hooks/optimize";
    import type { Component } from "svelte";
    import type { HTMLImgAttributes } from "svelte/elements";

    type ImageProps = HTMLImgAttributes;

    let { src, srcset, ...props }: ImageProps = $props();
</script>

<img src={optimizeSingle(src ?? "")} srcset={optimize(src ?? "")} {...props} />
