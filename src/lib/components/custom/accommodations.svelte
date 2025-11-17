<script lang="ts">
    interface Accommodation {
        name: string;
        url: string;
        description?: string;
    }

    const accommodations: Accommodation[] = [
        {
            name: "Dormero Hotel Freudenstadt",
            url: "https://www.dormero.de/hotel-freudenstadt/",
            description:
                "Rabatt von 20% auf die Tagesrate SMART. Flexibel bis 1 Tag vor Anreise kostenfrei stornierbar und ohne Vorauskasse. Buchungen müssen über die Website www.dormero.de mit Kreditkarte/Verfallsdatum als Garantie abgewickelt werden - nach Auswahl des Hotel und nach Eingabe der Reisedaten fügen Sie zusätzlich den PROMOCODE EVENTFLEX im vorgegebenen Feld dazu und die Sonderraten werden dann angezeigt. Frühstück kann separat auf Wunsch dazu gebucht werden.",
        },
        {
            name: "Hotel Hohenried",
            url: "https://hohenried.com/de/",
        },
        {
            name: "Camping Langenwald",
            url: "https://camping-langenwald.de/",
        },
    ];
</script>

<section class="py-12">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Übernachtungsmöglichkeiten</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
            In der Location selbst gibt es leider keine
            Übernachtungsmöglichkeiten. Im Folgenden haben wir euch aber ein
            paar Möglichkeiten herausgesucht:
        </p>
    </div>

    <div class="max-w-4xl mx-auto space-y-6">
        {#each accommodations as accommodation}
            <div class="bg-card rounded-lg border p-6">
                <h3 class="text-xl font-semibold mb-3">
                    <a
                        href={accommodation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary hover:underline"
                    >
                        {accommodation.name}
                    </a>
                </h3>
                {#if accommodation.description}
                    <p class="text-muted-foreground text-sm leading-relaxed">
                        {accommodation.description}
                    </p>
                {/if}
            </div>
        {/each}
    </div>
</section>
