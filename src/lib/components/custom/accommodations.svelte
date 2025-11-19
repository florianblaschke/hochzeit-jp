<script lang="ts">
    import { ExternalLink } from "@lucide/svelte";
    import { buttonVariants } from "../ui/button";
    import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
    import CardAction from "../ui/card/card-action.svelte";
    import CardFooter from "../ui/card/card-footer.svelte";
    import { cn } from "$lib/utils";

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

<section>
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Unterkünfte</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
            In der Location selbst gibt es leider keine
            Übernachtungsmöglichkeiten. Im Folgenden haben wir euch aber ein
            paar Möglichkeiten herausgesucht:
        </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12">
        {#each accommodations as accommodation, index}
            <Card class={cn("w-full", index === 0 && "col-span-full")}>
                <CardHeader>
                    <CardTitle>
                        <h3 class="text-2xl">
                            {accommodation.name}
                        </h3>
                    </CardTitle>
                    {#if accommodation.description}
                        <CardDescription class="text-lg">
                            {accommodation.description}
                        </CardDescription>
                    {/if}
                </CardHeader>
                <CardFooter>
                    <CardAction>
                        <a
                            target="_blank"
                            rel="noopener"
                            class={buttonVariants({
                                variant: "link",
                                class: "pl-0!",
                            })}
                            href={accommodation.url}
                        >
                            Zur Homepage
                            <ExternalLink />
                        </a>
                    </CardAction>
                </CardFooter>
            </Card>
        {/each}
    </div>
</section>
