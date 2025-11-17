<script lang="ts">
    import type { PageData } from "./$types";
    import LoginForm from "./login-form.svelte";

    let { data }: { data: PageData } = $props();
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
