<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/client";
    import { cn } from "$lib/utils";
    import { Badge } from "../ui/badge";
    import { Button } from "../ui/button";
    import ThemeSwitcher from "./theme-switcher.svelte";

    let session = authClient.useSession();

    let {
        isAdmin,
        attending,
    }: { isAdmin: boolean; attending: boolean | undefined } = $props();
</script>

<header class="border-b border-border w-full">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex justify-center gap-8 items-center">
            <a href="/" class="font-bold text-lg"> JP Wedding </a>
            {#if $session.data}
                <a href="/gallery">Gallerie</a>
            {/if}
            {#if isAdmin}
                <a href="/list">Guest List</a>
            {/if}
        </div>
        <div class="flex-1 flex justify-end gap-4">
            {#if typeof attending !== "undefined"}
                <Badge
                    variant="default"
                    class={cn(attending ? "bg-green-500" : "bg-red-500")}
                    >{attending ? "Zugesagt" : "Abgesagt"}</Badge
                >
            {/if}
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
