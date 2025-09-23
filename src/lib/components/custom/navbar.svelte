<script lang="ts">
    import { authClient } from "$lib/auth/client";
    import { Button } from "../ui/button";
    import ThemeSwitcher from "./theme-switcher.svelte";

    let session = authClient.useSession();
</script>

<header class="border-b border-border w-full">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex-1"></div>
        <div class="flex justify-center gap-8 items-center">
            <a href="/info"> Informationen </a>
            <h1 class="text-2xl font-bold text-foreground">JP Wedding</h1>
            <a href="/gallery">Gallerie</a>
        </div>
        <div class="flex-1 flex justify-end gap-4">
            {#if $session.data}
                <Button onclick={() => authClient.signOut()}>Sign Out</Button>
            {/if}
            <ThemeSwitcher />
        </div>
    </div>
</header>
