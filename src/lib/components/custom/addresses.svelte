<script lang="ts">
    interface Address {
        title: string;
        address: string;
    }

    const addresses: Address[] = [
        {
            title: "Kirche",
            address: "Marktplatz 35, 72250 Freudenstadt",
        },
        {
            title: "Location",
            address:
                "Das Hofgut Bärenschlössle, Christoph Straße 29, 72250 Freudenstadt",
        },
    ];
</script>

<section class="py-12">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Adressen</h2>
    </div>

    <div class="max-w-2xl mx-auto space-y-6">
        {#each addresses as address}
            <div class="bg-card rounded-lg border p-6 text-center">
                <h3 class="text-xl font-semibold mb-3">{address.title}</h3>
                <p class="text-muted-foreground">{address.address}</p>
            </div>
        {/each}
    </div>
</section>
