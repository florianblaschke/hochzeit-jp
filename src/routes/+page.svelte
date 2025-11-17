<script lang="ts">
    import RSVPForm from "./rsvp-form.svelte";
    import Timeline from "$lib/components/custom/timeline.svelte";
    import Addresses from "$lib/components/custom/addresses.svelte";
    import Parking from "$lib/components/custom/parking.svelte";
    import Accommodations from "$lib/components/custom/accommodations.svelte";
    import Registry from "$lib/components/custom/registry.svelte";
    import ReceptionContributions from "$lib/components/custom/reception-contributions.svelte";
    import WeddingVerse from "$lib/components/custom/wedding-verse.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="bg-background">
    <main class="container mx-auto px-4 py-8">
        {#if !Boolean(data.rsvp)}
            <div class="mt-8">
                <RSVPForm form={data.form} />
            </div>
        {:else}
            <div class="space-y-16">
                <Timeline />
                <Addresses />
                <Parking />
                <Accommodations />
                <Registry />
                <ReceptionContributions />
                <WeddingVerse />
            </div>
        {/if}
    </main>
</div>
