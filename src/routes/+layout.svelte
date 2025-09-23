<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { ModeWatcher } from "mode-watcher";
    import Navbar from "$lib/components/custom/navbar.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Navbar />
{@render children?.()}
