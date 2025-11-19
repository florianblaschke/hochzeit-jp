<script lang="ts">
    import RSVPForm from "./rsvp-form.svelte";
    import Timeline from "$lib/components/custom/timeline.svelte";
    import Addresses from "$lib/components/custom/addresses.svelte";
    import Accommodations from "$lib/components/custom/accommodations.svelte";
    import Registry from "$lib/components/custom/registry.svelte";
    import ReceptionContributions from "$lib/components/custom/reception-contributions.svelte";
    import WeddingVerse from "$lib/components/custom/wedding-verse.svelte";
    import type { PageData } from "./$types";
    import Hero from "$lib/components/custom/hero.svelte";

    let { data }: { data: PageData } = $props();
</script>

<div class="bg-background">
    {#if !Boolean(data.rsvp)}
        <RSVPForm form={data.form} />
    {:else}
        <main>
            <div class="space-y-16 pt-8">
                <Hero />
                <Timeline />
                <Addresses />
                <Accommodations />
                <Registry />
                <ReceptionContributions />
                <WeddingVerse />
            </div>
        </main>
    {/if}
</div>
