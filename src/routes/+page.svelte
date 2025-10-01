<script lang="ts">
    import RSVPForm from "./rsvp-form.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="bg-background">
    <main class="container mx-auto px-4 py-16">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Jana & Philipp heiraten
            </h1>
            <h2 class="text-2xl text-muted-foreground">
                Endlich Briefmarken einkleben
            </h2>
        </div>

        {#if !Boolean(data.rsvp)}
            <div class="mt-8">
                <RSVPForm form={data.form} />
            </div>
        {/if}
    </main>
</div>
