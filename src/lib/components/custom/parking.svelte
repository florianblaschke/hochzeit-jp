<script lang="ts">
    interface ParkingInfo {
        location: string;
        details: string;
    }

    const parkingInfo: ParkingInfo[] = [
        {
            location: "Kirche",
            details:
                "begrenzte Anzahl hinter der Kirche, Tiefgarage CONTIPARK Oberer Marktplatz",
        },
        {
            location: "Location",
            details: "vor Ort sind ausreichend Parkmöglichkeiten vorhanden",
        },
    ];
</script>

<section class="py-12">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Parkplätze</h2>
    </div>

    <div class="max-w-2xl mx-auto space-y-6">
        {#each parkingInfo as parking}
            <div class="bg-card rounded-lg border p-6">
                <h3 class="text-xl font-semibold mb-3">{parking.location}</h3>
                <p class="text-muted-foreground">{parking.details}</p>
            </div>
        {/each}
    </div>
</section>
