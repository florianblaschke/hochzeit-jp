<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/client";
    import { Button } from "../ui/button";
    import ThemeSwitcher from "./theme-switcher.svelte";

    let session = authClient.useSession();
</script>

<header class="border-b border-border w-full">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex justify-center gap-8 items-center">
            <a href="/" class="font-bold text-lg"> JP Wedding </a>
            {#if $session.data}
                <a href="/gallery">Gallerie</a>
            {/if}
        </div>
        <div class="flex-1 flex justify-end gap-4">
            {#if $session.data}
                <Button
                    onclick={() => {
                        authClient.signOut();
                        goto("/login");
                    }}>Sign Out</Button
                >
            {/if}
            <ThemeSwitcher />
        </div>
    </div>
</header>
