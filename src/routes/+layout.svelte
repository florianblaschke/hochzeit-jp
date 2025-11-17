<script lang="ts">
    import { browser } from "$app/environment";
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "$lib/components/custom/navbar.svelte";
    import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
    import { ModeWatcher } from "mode-watcher";
    import "../app.css";
    import type { LayoutProps } from "./$types";
    import { page } from "$app/state";

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
    {#if page.route.id !== "/login"}
        <Navbar
            isAdmin={data.isAdmin ?? false}
            attending={data.attending}
            isLoggedIn={data.isLoggedIn ?? false}
        />
    {/if}
    {@render children?.()}
</QueryClientProvider>
