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

<section>
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Ablauf</h2>
    </div>

    <div class="max-w-2xl mx-auto">
        <div class="space-y-6 grid items-center justify-center">
            {#each timelineItems as item, index}
                <div class="flex flex-col items-center gap-6">
                    <div class="flex-shrink-0 w-20 text-right">
                        <span class="text-lg font-semibold text-primary"
                            >{item.time}</span
                        >
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-medium">{item.event}</h3>
                    </div>
                </div>
                <Separator />
            {/each}
        </div>
    </div>
</section>
