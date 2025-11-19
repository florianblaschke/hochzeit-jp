<script lang="ts">
    import GuestListItem from "$lib/components/guest-list-item.svelte";
    import { type PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Guest List</h1>
    </div>

    {#if !data.guests}
        <div class="flex justify-center items-center py-12">
            <div class="text-muted-foreground">
                Bisher hat noch niemand die RSVP ausgefüllt.
            </div>
        </div>
    {:else if data.guests}
        <ul class="space-y-3">
            {#each data.guests as guest (guest.user.id)}
                <GuestListItem {guest} />
            {/each}
        </ul>

        <div class="mt-6 text-sm text-muted-foreground text-center">
            Total guests: {data.guests.length}
        </div>
    {/if}
</div>
