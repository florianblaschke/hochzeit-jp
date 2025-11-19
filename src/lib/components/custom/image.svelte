<script lang="ts">
    import { optimize } from "$lib/helpers/optimize";
    import type { HTMLImgAttributes } from "svelte/elements";
    import { SIZES } from "../../utils";

    type ImageProps = HTMLImgAttributes;

    let { src, srcset, ...props }: ImageProps = $props();
</script>

<img srcset={optimize(src, SIZES)} {...props} />
