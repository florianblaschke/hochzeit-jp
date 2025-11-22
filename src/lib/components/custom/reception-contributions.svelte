<script lang="ts">
    const registryUrl = "https://www.wishbob.com/iywxdctrzg";

    const spreadsheetUrl =
        "https://docs.google.com/spreadsheets/d/1-hinreJ_Jj1Mt5LhDKXjKGYFMgmXBhOlPlrCFTEzpIo/edit?usp=sharing";
</script>

<section class="py-container">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Beiträge & Wünsche</h2>
    </div>

    <div
        class="container mx-auto flex flex-col items-center md:flex-row md:gap-12"
    >
        <article class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4">Sektempfang</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto mb-6">
                Wir freuen uns sehr, wenn ihr Häppchen, Kuchen oder Ähnliches
                zum Sektempfang beisteuert. Bitte tragt euch dafür in die Liste
                ein:
            </p>

            <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
                Zur Beitrags-Liste
            </a>
        </article>
        <article class="py-container">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold mb-4">Wunschliste</h2>
                <p class="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Falls ihr uns eine Freude machen möchtet, haben wir eine
                    kleine Wunschliste zusammengestellt.
                </p>

                <a
                    href={registryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    Zur Wunschliste
                </a>
            </div>
        </article>
    </div>
</section>
