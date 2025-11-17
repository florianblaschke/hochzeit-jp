<script lang="ts">
    import { createQuery } from "@tanstack/svelte-query";
    import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle,
        SheetTrigger,
    } from "$lib/components/ui/sheet";
    import GuestListItem from "$lib/components/guest-list-item.svelte";
    import { type PageData } from "./$types";
    import { buttonVariants } from "$lib/components/ui/button";
    import { cn } from "$lib/utils";
    import GuestForm from "./guest-form.svelte";

    let { data }: { data: PageData } = $props();

    let isSheetOpen = $state(false);

    const guestsQuery = createQuery({
        queryKey: ["guests"],
        queryFn: async () => {
            const response = await fetch("/api/guests");
            if (!response.ok) {
                throw new Error("Failed to fetch guests");
            }
            return response.json();
        },
        initialData: data.guests,
    });

    const closeSheet = () => {
        isSheetOpen = false;
    };
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Guest List</h1>

        <!-- <Sheet bind:open={isSheetOpen}>
            <SheetTrigger class={cn(buttonVariants({ variant: "default" }))}
                >Add Guest</SheetTrigger
            >

            <SheetContent side="right" class="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Add New Guest</SheetTitle>
                    <SheetDescription>
                        Add a new guest to your wedding list by entering their
                        email address.
                    </SheetDescription>
                </SheetHeader>

                <div class="mt-6">
                    <GuestForm onSuccess={closeSheet} form={data.form} />
                </div>
            </SheetContent>
        </Sheet> -->
    </div>

    {#if $guestsQuery.isLoading}
        <div class="flex justify-center items-center py-12">
            <div class="text-muted-foreground">Loading guests...</div>
        </div>
    {:else if $guestsQuery.error}
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="text-destructive">
                Error loading guests: {$guestsQuery.error.message}
            </div>
        </div>
    {:else if $guestsQuery.data && $guestsQuery.data.length === 0}
        <div class="text-center py-12">
            <div class="text-muted-foreground mb-4">No guests yet</div>
            <!-- <p class="text-sm text-muted-foreground">
                Click "Add Guest" to get started
            </p> -->
        </div>
    {:else if $guestsQuery.data}
        <ul class="space-y-3">
            {#each $guestsQuery.data as guest (guest.id)}
                <GuestListItem {guest} />
            {/each}
        </ul>

        <div class="mt-6 text-sm text-muted-foreground text-center">
            Total guests: {$guestsQuery.data.length}
        </div>
    {/if}
</div>
