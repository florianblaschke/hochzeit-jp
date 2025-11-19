<script lang="ts">
    import CardContent from "../ui/card/card-content.svelte";
    import CardDescription from "../ui/card/card-description.svelte";
    import CardHeader from "../ui/card/card-header.svelte";
    import CardTitle from "../ui/card/card-title.svelte";
    import Card from "../ui/card/card.svelte";

    type Address = {
        title: string;
        address: string;
        href: string;
        info: string;
    };

    const addresses: Address[] = [
        {
            title: "Kirche",
            address: "Marktplatz 35, 72250 Freudenstadt",
            href: "https://www.google.com/maps/place/Marktpl.+35,+72250+Freudenstadt/@48.4624662,8.408089,683m/data=!3m2!1e3!4b1!4m6!3m5!1s0x479734454ed71adf:0x80dc305d7960d014!8m2!3d48.4624662!4d8.4106639!16s%2Fg%2F11bw4mqnrq?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D",
            info: "begrenzte Anzahl hinter der Kirche, Tiefgarage CONTIPARK Oberer Marktplatz",
        },
        {
            title: "Location",
            address:
                "Das Hofgut Bärenschlössle, Christoph Straße 29, 72250 Freudenstadt",
            href: "https://www.google.com/maps/place/Hofgut+Bärenschlössle+-+Hochzeitsveranstaltungen/@48.4609464,8.3984215,1367m/data=!3m2!1e3!4b1!4m9!3m8!1s0x4797345cec6a66b1:0xb088260060a3752d!5m2!4m1!1i2!8m2!3d48.4609465!4d8.4032924!16s%2Fg%2F1tdfxnsj?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D",
            info: "vor Ort sind ausreichend Parkmöglichkeiten vorhanden",
        },
    ];
</script>

<section>
    <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Adressen</h2>
    </div>

    <div
        class="w-full justify-between flex flex-col md:flex-row items-center gap-12"
    >
        {#each addresses as address}
            <Card class="w-full">
                <CardHeader>
                    <CardTitle>
                        <h3 class="text-2xl">
                            {address.title}
                        </h3>
                    </CardTitle>
                    <CardDescription class="text-lg">
                        <a target="_blank" rel="noopener" href={address.href}
                            >{address.address}</a
                        >
                    </CardDescription>
                    <CardContent class="px-0">
                        <p>Parkmöglichkeiten:</p>
                        {address.info}
                    </CardContent>
                </CardHeader>
            </Card>
        {/each}
    </div>
</section>
