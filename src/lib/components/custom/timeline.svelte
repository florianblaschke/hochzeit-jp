<script lang="ts">
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

<section class="py-12">
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Ablauf</h2>
    </div>

    <div class="max-w-2xl mx-auto">
        <div class="ml-32 space-y-6 grid items-center justify-center">
            {#each timelineItems as item, index}
                <div class="flex items-center gap-6">
                    <div class="flex-shrink-0 w-20 text-right">
                        <span class="text-lg font-semibold text-primary"
                            >{item.time}</span
                        >
                    </div>
                    <div class="flex-shrink-0 w-px h-12 bg-border relative">
                        <div
                            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background"
                        ></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-medium">{item.event}</h3>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
