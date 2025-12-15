<script lang="ts">
    import { cn } from "$lib/utils";
    import { MoveRight } from "@lucide/svelte";
    import { buttonVariants } from "../ui/button";
    import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
    import CardAction from "../ui/card/card-action.svelte";
    import CardFooter from "../ui/card/card-footer.svelte";

    interface Accommodation {
        name: string;
        url: string;
        description?: string;
    }

    const accommodations: Accommodation[] = [
        {
            name: "Dormero Hotel Freudenstadt",
            url: "https://www.dormero.de/hotel-freudenstadt/",
            description: "20% auf die Tagesrate SMART mit dem Code: EVENTFLEX",
        },
        {
            name: "Hotel Hohenried",
            url: "https://hohenried.com/de/",
        },
        {
            name: "Camping Langenwald",
            url: "https://camping-langenwald.de/",
        },
        {
            name: "Jugendherberge Freudenstadt",
            url: "https://www.jugendherberge.de/jugendherbergen/freudenstadt/",
        },
    ];
</script>

<section class="bg-secondary text-secondary-foreground py-container">
    <div class="container mx-auto">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4">Unterkünfte</h2>
            <p class="max-w-2xl mx-auto">
                In der Location selbst gibt es leider keine
                Übernachtungsmöglichkeiten. Im Folgenden haben wir euch aber ein
                paar Möglichkeiten herausgesucht:
            </p>
        </div>

        <div class="grid md:grid-cols-3 md:gap-12">
            {#each accommodations as accommodation, index}
                <Card
                    class={cn(
                        "w-full text-center bg-transparent text-secondary-foreground",
                        index === 0 && "col-span-full"
                    )}
                >
                    <CardHeader>
                        <CardTitle>
                            <h3>
                                {accommodation.name}
                            </h3>
                        </CardTitle>
                        <CardDescription class="text-lg">
                            <a
                                target="_blank"
                                rel="noopener"
                                class={buttonVariants({
                                    variant: "link",
                                    class: "pl-0! text-secondary-foreground",
                                })}
                                href={accommodation.url}
                            >
                                <MoveRight />
                                Online buchen
                            </a>
                            {#if accommodation.description}
                                <span class="block text-secondary-foreground">
                                    {accommodation.description}
                                </span>
                            {/if}
                        </CardDescription>
                    </CardHeader>
                </Card>
            {/each}
        </div>
    </div>
</section>
