<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        FormControl,
        FormField,
        FormFieldErrors,
        FormLabel,
    } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import {
        type Infer,
        superForm,
        type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { loginSchema, type LoginSchema } from "./schema";

    let {
        form: formShape,
    }: {
        form: SuperValidated<Infer<LoginSchema>>;
    } = $props();

    let detailsRequired = $state(false);

    const form = superForm(formShape, {
        validators: zodClient(loginSchema),
        onUpdated: ({ form }) => {
            if (form.errors.password || form.errors.name) {
                detailsRequired = true;
            }
            if (form.valid) {
            }
        },
    });

    const { form: formData, enhance, submitting, message, errors } = form;
</script>

<form method="POST" class="space-y-4 p-4" use:enhance>
    <FormField {form} name="email">
        <FormControl>
            {#snippet children({ props })}
                <FormLabel>Email Adresse</FormLabel>
                <Input {...props} bind:value={$formData.email} />
            {/snippet}
        </FormControl>
        <FormFieldErrors />
    </FormField>

    {#if detailsRequired}
        <FormField {form} name="password">
            <FormControl>
                {#snippet children({ props })}
                    <FormLabel>Passwort</FormLabel>
                    <Input
                        {...props}
                        type="password"
                        bind:value={$formData.password}
                    />
                {/snippet}
            </FormControl>
            <FormFieldErrors />
        </FormField>

        <FormField {form} name="name">
            <FormControl>
                {#snippet children({ props })}
                    <FormLabel>Name</FormLabel>
                    <Input {...props} bind:value={$formData.name} />
                {/snippet}
            </FormControl>
            <FormFieldErrors />
        </FormField>
    {/if}

    <Button type="submit" disabled={$submitting} class="w-full">
        {$submitting ? "Anmelden…" : "Anmelden"}
    </Button>

    {#if $message}
        <div class="text-green-500 text-sm leading-tight">{$message}</div>
    {/if}

    {#if $errors._errors}
        <div class="text-destructive text-sm leading-tight">
            {$errors._errors[0]}
        </div>
    {/if}
</form>
