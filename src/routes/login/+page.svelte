<script lang="ts">
    import Image from "$lib/components/custom/image.svelte";
    import type { PageData } from "./$types";
    import LoginForm from "./login-form.svelte";

    let { data }: { data: PageData } = $props();
</script>

<div class="grid min-h-svh lg:grid-cols-2">
    <div
        class="flex flex-col items-center justify-center w-full gap-4 p-6 md:p-10"
    >
        <div class="flex flex-col items-center justify-center gap-2 w-full">
            <p>Hochzeit von</p>
            <h1 class="text-xl sm:text-2xl md:text-4xl text-center">
                Jana & Philipp
            </h1>
            <p>18 | 04 | 2026</p>
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
            sizes="(max-width: 768px) 50vw"
            alt="Jana & Philipp"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
</div>
