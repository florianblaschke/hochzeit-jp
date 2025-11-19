<script lang="ts">
    import Image from "$lib/components/custom/image.svelte";
    import type { PageData } from "./$types";
    import LoginForm from "./login-form.svelte";

    let { data }: { data: PageData } = $props();
</script>

<div class="grid min-h-svh lg:grid-cols-2 relative">
    <div class="absolute inset-0 lg:hidden">
        <Image
            src="https://utfs.io/f/KCC3bUkGRI6acaAoa80Y6yOhNc8LqRWudanU4SxCVQswgAHv"
            sizes="100vw"
            alt="Jana & Philipp"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div
        class="flex flex-col items-center justify-end md:justify-center w-full gap-4 p-6 md:p-10 relative z-10"
    >
        <div class="flex flex-col items-center justify-center gap-2 w-full">
            <p class="text-white lg:text-foreground">Hochzeit von</p>
            <h1
                class="text-xl sm:text-2xl md:text-4xl text-center text-white lg:text-foreground"
            >
                Jana & Philipp
            </h1>
            <p class="text-white lg:text-foreground">18 | 04 | 2026</p>
        </div>
        <div class="flex items-center justify-center w-full">
            <div class="w-full max-w-xs">
                <LoginForm form={data.form} />
            </div>
        </div>
    </div>
    <div class="bg-muted relative hidden lg:block">
        <Image
            src="https://utfs.io/f/KCC3bUkGRI6acaAoa80Y6yOhNc8LqRWudanU4SxCVQswgAHv"
            sizes="50vw"
            alt="Jana & Philipp"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
</div>
