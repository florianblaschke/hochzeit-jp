<script lang="ts">
    import { authClient } from "$lib/auth/client";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import ThemeSwitcher from "$lib/components/custom/theme-switcher.svelte";
    import { Image } from "@unpic/svelte";

    let email = $state("");
    let isLoading = $state(false);
    let errorMessage = $state("");

    const session = authClient.useSession();

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!email.trim()) {
            errorMessage = "Please enter your email address";
            return;
        }

        isLoading = true;
        errorMessage = "";

        try {
            const { data, error } = await authClient.signIn.magicLink({
                email: email.trim(),
            });

            if (error) {
                errorMessage = "Failed to send magic link. Please try again.";
            }
        } catch (err) {
            errorMessage = "Something went wrong. Please try again.";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-screen bg-background">
    <main class="container mx-auto px-4 py-16">
        {#if $session.data}
            <!-- Authenticated State -->
            <div class="max-w-md mx-auto text-center">
                <h2 class="text-3xl font-bold text-foreground mb-4">
                    Welcome!
                </h2>
                <p class="text-muted-foreground mb-6">
                    Hello, {$session.data.user.name || $session.data.user.email}
                </p>
                <Button
                    onclick={async () => {
                        await authClient.signOut();
                    }}
                    variant="outline"
                >
                    Sign Out
                </Button>
            </div>
        {:else}
            <!-- Login Form -->
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
                            disabled={isLoading}
                            required
                        />
                        {#if errorMessage}
                            <p class="text-sm text-destructive">
                                {errorMessage}
                            </p>
                        {/if}
                    </div>

                    <Button type="submit" class="w-full" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Continue with Magic Link"}
                    </Button>

                    <p class="text-xs text-muted-foreground text-center">
                        We'll send you a secure link to access the wedding
                        website
                    </p>
                </form>
            </div>
        {/if}
    </main>
</div>
