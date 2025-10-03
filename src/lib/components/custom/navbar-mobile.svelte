<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/client";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Menu } from "@lucide/svelte";
    import { cn } from "tailwind-variants";
    import { Badge } from "../ui/badge";
    import ThemeSwitcher from "./theme-switcher.svelte";

    let session = authClient.useSession();

    let {
        isAdmin,
        attending,
    }: { isAdmin: boolean; attending: boolean | undefined } = $props();
</script>

<div class="flex items-center justify-between md:hidden px-4 py-4">
    <a href="/" class="font-bold text-lg"> JP Wedding </a>
    <Sheet.Root>
        <Sheet.Trigger
            class={cn(
                buttonVariants({
                    variant: "outline",
                }),
            )}><Menu /></Sheet.Trigger
        >
        <Sheet.Content side="right">
            <Sheet.Header>
                <Sheet.Title>JP Wedding</Sheet.Title>
                <Sheet.Description>
                    {#if typeof attending !== "undefined"}
                        <Badge
                            variant="default"
                            class={cn(
                                attending ? "bg-green-500" : "bg-red-500",
                            )}>{attending ? "Zugesagt" : "Abgesagt"}</Badge
                        >
                    {/if}
                </Sheet.Description>
            </Sheet.Header>
            <div class="grid flex-1 auto-rows-min gap-6 px-4">
                {#if $session.data}
                    <a
                        href="/gallery"
                        class={cn(buttonVariants({ variant: "link" }))}
                        >Gallerie</a
                    >
                {/if}
                {#if isAdmin}
                    <a
                        href="/list"
                        class={cn(buttonVariants({ variant: "link" }))}
                        >Guest List</a
                    >
                {/if}
            </div>

            <Sheet.Footer class="flex flex-row items-center justify-between">
                {#if $session.data}
                    <Button
                        onclick={() => {
                            authClient.signOut();
                            goto("/login");
                        }}>Sign Out</Button
                    >
                {/if}
                <ThemeSwitcher />
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>
</div>
