<script lang="ts">
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/client";
    import { cn } from "$lib/utils";
    import { Badge } from "../ui/badge";
    import { Button, buttonVariants } from "../ui/button";
    import NavbarMobile from "./navbar-mobile.svelte";
    import ThemeSwitcher from "./theme-switcher.svelte";
    import { onMount } from "svelte";

    let session = authClient.useSession();

    let {
        isAdmin,
        attending,
        isLoggedIn = false,
    }: {
        isAdmin: boolean;
        attending: boolean | undefined;
        isLoggedIn?: boolean;
    } = $props();

    let isVisible = $state(true);
    let lastScrollY = $state(0);
    let ticking = $state(false);

    function updateScrollDirection() {
        const scrollY = window.scrollY;

        if (Math.abs(scrollY - lastScrollY) < 10) {
            ticking = false;
            return;
        }

        if (scrollY < 10 || scrollY < lastScrollY) {
            isVisible = true;
        } else if (scrollY > lastScrollY && scrollY > 100) {
            isVisible = false;
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateScrollDirection);
        }
    }

    onMount(() => {
        const handleScroll = () => requestTick();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

{#if typeof attending === "boolean"}
    <header
        class="border-b border-border w-full fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm transition-transform duration-300 {isVisible
            ? 'translate-y-0'
            : '-translate-y-full'}"
    >
        <div class="container mx-auto">
            <NavbarMobile {attending} {isAdmin} {isLoggedIn} />
            <div class="hidden md:flex items-center justify-between px-4 py-4">
                <div class="flex justify-center gap-2 items-center">
                    <a
                        href="/"
                        class={cn(
                            buttonVariants({
                                variant: "link",
                                class: "font-bold text-lg pl-0",
                            }),
                        )}
                    >
                        Jana & Philipp
                    </a>
                    {#if isLoggedIn || $session.data}
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
                            >Gästeliste</a
                        >
                    {/if}
                </div>
                <div class="flex-1 flex justify-end gap-4">
                    <!-- {#if typeof attending !== "undefined"}
                        <Badge
                            variant="default"
                            class={cn(
                                attending ? "bg-green-500" : "bg-red-500",
                            )}>{attending ? "Zugesagt" : "Abgesagt"}</Badge
                        >
                    {/if}
                    {#if isLoggedIn || $session.data}
                        <Button
                            onclick={() => {
                                authClient.signOut();
                                goto("/login", { invalidateAll: true });
                            }}>Abmelden</Button
                        >
                    {/if} -->
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    </header>
{/if}
