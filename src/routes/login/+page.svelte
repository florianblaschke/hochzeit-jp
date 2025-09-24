<script lang="ts">
    import { authClient } from "$lib/auth/client";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { cn } from "$lib/utils";
    import { createMutation } from "@tanstack/svelte-query";

    let email = $state("");
    let errorMessage = $state("");

    let loginMutation = createMutation({
        mutationKey: ["login"],
        mutationFn: async () => {
            const { data, error } = await authClient.signIn.magicLink({
                email: email.trim(),
            });

            if (error) {
                throw new Error("Failed to send magic link. Please try again.");
            }
        },
    });

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!email.trim()) {
            errorMessage = "Please enter your email address";
            return;
        }

        $loginMutation.mutate();
    }
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

            <form onsubmit={handleSubmit} class="space-y-6">
                <div class="space-y-2">
                    <Label for="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        bind:value={email}
                        disabled={$loginMutation.isPending}
                        required
                    />
                    {#if errorMessage}
                        <p class="text-sm text-destructive">
                            {errorMessage}
                        </p>
                    {/if}
                </div>

                <Button
                    type="submit"
                    class="w-full"
                    disabled={$loginMutation.isPending}
                >
                    {$loginMutation.isPending
                        ? "Sending..."
                        : "Continue with Magic Link"}
                </Button>

                <p
                    class={cn(
                        "text-xs text-muted-foreground text-center",
                        $loginMutation.isSuccess && "text-green-500",
                    )}
                >
                    {$loginMutation.isSuccess
                        ? `We sent you an invitation to ${email}. Please check your
                    mails.`
                        : "We'll send you a secure link to access the wedding website"}
                </p>
            </form>
        </div>
    </main>
</div>
