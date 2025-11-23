<script lang="ts">
    import { cn } from "$lib/utils";
    import { buttonVariants } from "../ui/button";

    const registryUrl = "https://www.wishbob.com/iywxdctrzg";

    const spreadsheetUrl =
        "https://docs.google.com/spreadsheets/d/1-hinreJ_Jj1Mt5LhDKXjKGYFMgmXBhOlPlrCFTEzpIo/edit?usp=sharing";
</script>

<section class="py-container">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Beiträge & Wünsche</h2>
    </div>

    <div
        class="container mx-auto flex flex-col items-stretch md:flex-row md:gap-12"
    >
        <article class="text-center mb-8 flex flex-col flex-1 items-center">
            <h2 class="text-3xl font-bold mb-4">Sektempfang</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto mb-6 flex-1">
                Wir freuen uns sehr, wenn ihr Häppchen, Kuchen oder Ähnliches
                zum Sektempfang beisteuert. Bitte tragt euch dafür in die Liste
                ein:
            </p>

            <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                class={cn(
                    buttonVariants({ variant: "default", class: "w-fit" }),
                )}
            >
                Zur Beitrags-Liste
            </a>
        </article>
        <article class="text-center mb-8 flex flex-col flex-1 items-center">
            <h2 class="text-3xl font-bold mb-4">Wunschliste</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto mb-6 flex-1">
                Falls ihr uns eine Freude machen möchtet, haben wir eine kleine
                Wunschliste zusammengestellt.
            </p>

            <a
                href={registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                class={cn(
                    buttonVariants({ variant: "default", class: "w-fit" }),
                )}
            >
                Zur Wunschliste
            </a>
        </article>
        <article class="text-center mb-8 flex flex-col flex-1 items-center">
            <h2 class="text-3xl font-bold mb-4">Programm</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto mb-6 flex-1">
                Wir freuen uns sehr, wenn ihr den Abend aktiv mit gestaltet.
                Meldet eure Beiträge dafür bitte bei Tobias Gritsch an.
            </p>

            <a
                href="mailto:tobi.gritsch@t-online.de"
                class={cn(
                    buttonVariants({ variant: "default", class: "w-fit" }),
                )}
            >
                Mail an tobi.gritsch@t-online.de
            </a>
        </article>
    </div>
</section>
