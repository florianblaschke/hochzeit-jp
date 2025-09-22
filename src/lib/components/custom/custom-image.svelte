<script lang="ts">
    import { Image } from "@unpic/svelte";

    let props = $props();
</script>

<Image
    {...props}
    options={{
        vercel: {
            force: true,
        },
    }}
/>
