<script lang="ts">
    import { browser } from "$app/environment";
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "$lib/components/custom/navbar.svelte";
    import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
    import { ModeWatcher } from "mode-watcher";
    import "../app.css";
    import type { LayoutProps } from "./$types";

    let { children, data }: LayoutProps = $props();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
            },
        },
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
    <ModeWatcher />
    <Navbar isAdmin={data.isAdmin} attending={data.attending} />
    {@render children?.()}
</QueryClientProvider>
