<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { cn } from "$lib/utils";
    import { createMutation } from "@tanstack/svelte-query";
    import LoginForm from "./login-form.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    // let loginMutation = createMutation({
    //     mutationKey: ["login"],
    //     mutationFn: async () => {
    //         const res = await fetch(`/api/verify`, {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //             body: JSON.stringify({ email, password, name }),
    //         });

    //         if (res.status === 401) {
    //             passwordRequired = true;
    //             passwordMessage =
    //                 "Bitte gib das Passwort auf der Einladung ein";
    //             nameMessage = "Bitte gib einen Namen ein.";
    //             throw new Error("missing_password");
    //         }

    //         if (res.status === 500) {
    //             errorMessage =
    //                 "Das Senden des Anmeldelinks ist fehlgeschlagen. Bitte versuche es erneut.";
    //         }
    //     },
    // });
</script>

<div class="min-h-screen bg-background">
    <main class="container mx-auto px-4 py-16">
        <div class="max-w-md mx-auto">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-foreground mb-4">
                    Join Our Celebration
                </h2>
                <p class="text-muted-foreground">
                    Enter your email to access our wedding website
                </p>
            </div>

            <LoginForm form={data.form} />
        </div>
    </main>
</div>
