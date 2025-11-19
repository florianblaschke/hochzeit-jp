<script lang="ts">
    import RSVPForm from "./rsvp-form.svelte";
    import Timeline from "$lib/components/custom/timeline.svelte";
    import Addresses from "$lib/components/custom/addresses.svelte";
    import Accommodations from "$lib/components/custom/accommodations.svelte";
    import ReceptionContributions from "$lib/components/custom/reception-contributions.svelte";
    import WeddingVerse from "$lib/components/custom/wedding-verse.svelte";
    import type { PageData } from "./$types";
    import Hero from "$lib/components/custom/hero.svelte";
    import Footer from "$lib/components/custom/footer.svelte";

    let { data }: { data: PageData } = $props();
</script>

<div class="bg-background">
    {#if !Boolean(data.rsvp)}
        <RSVPForm form={data.form} />
    {:else}
        <main class="pt-16 md:pt-8">
            <Hero />
            <WeddingVerse />
            <Timeline />
            <Addresses />
            <Accommodations />
            <ReceptionContributions />
        </main>
        <Footer />
    {/if}
</div>
