<script lang="ts">
    import Separator from "../ui/separator/separator.svelte";

    interface TimelineItem {
        time: string;
        event: string;
    }

    const timelineItems: TimelineItem[] = [
        { time: "14:00 Uhr", event: "Trauung" },
        { time: "16:00 Uhr", event: "Sektempfang" },
        { time: "18:30 Uhr", event: "Dinner" },
        { time: "22:00 Uhr", event: "Eröffnung der Tanzfläche" },
    ];
</script>

<section class="bg-secondary text-secondary-foreground py-container">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Ablauf</h2>
    </div>

    <div class="max-w-4xl mx-auto w-full">
        <div
            class="flex items-center flex-col md:flex-row justify-center w-full divide-y md:divide-y-0 md:divide-x"
        >
            {#each timelineItems as item}
                <div class="flex flex-1 flex-col items-center gap-6 p-6">
                    <div class="flex-shrink-0 w-20 text-right">
                        <span class="text-lg font-semibold">{item.time}</span>
                    </div>
                    <div class="text-center">
                        <h3 class="text-xl font-medium whitespace-nowrap">
                            {item.event}
                        </h3>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
