<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        FormControl,
        FormField,
        FormFieldErrors,
        FormFieldset,
        FormLabel,
    } from "$lib/components/ui/form";
    import RadioGroupItem from "$lib/components/ui/radio-group/radio-group-item.svelte";
    import RadioGroup from "$lib/components/ui/radio-group/radio-group.svelte";
    import { Textarea } from "$lib/components/ui/textarea";
    import { useQueryClient } from "@tanstack/svelte-query";
    import {
        type Infer,
        superForm,
        type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { rsvpSchema, type RsvpSchema } from "./rsvp-schema";

    let {
        onSuccess,
        form: formShape,
    }: {
        onSuccess?: () => void;
        form: SuperValidated<Infer<RsvpSchema>>;
    } = $props();

    const queryClient = useQueryClient();

    const form = superForm(formShape, {
        validators: zodClient(rsvpSchema),
        onChange: () => {
            console.log($formData);
        },
        onUpdated: ({ form }) => {
            if (form.valid) {
                queryClient.invalidateQueries({ queryKey: ["rsvp"] });
                onSuccess?.();
            }
        },
    });

    const { form: formData, enhance, submitting } = form;
</script>

<form
    method="POST"
    class="space-y-6 p-6 rounded-lg shadow-md max-w-md mx-auto"
    use:enhance
>
    <div class="text-center">
        <h2 class="text-2xl font-bold mb-2">RSVP</h2>
        <p class="text-muted-foreground">
            Bitte lass uns wissen, ob du kommen kannst!
        </p>
    </div>

    <div class="space-y-4">
        <FormFieldset {form} name="attending">
            <RadioGroup bind:value={$formData.attending} name="attending">
                <div class="flex items-center space-x-3 space-y-0">
                    <FormControl>
                        {#snippet children({ props })}
                            <RadioGroupItem value="true" {...props} />
                            <FormLabel class="font-normal"
                                >Ja, ich komme! 🎉</FormLabel
                            >
                        {/snippet}
                    </FormControl>
                </div>
                <div class="flex items-center space-x-3 space-y-0">
                    <FormControl>
                        {#snippet children({ props })}
                            <RadioGroupItem value="false" {...props} />
                            <FormLabel class="font-normal"
                                >Kann leider nicht 😢</FormLabel
                            >
                        {/snippet}
                    </FormControl>
                </div>
            </RadioGroup>
            <FormFieldErrors />
        </FormFieldset>
    </div>
    <FormField {form} name="message">
        <FormControl>
            {#snippet children({ props })}
                <FormLabel>Nachricht (optional)</FormLabel>
                <Textarea
                    {...props}
                    bind:value={$formData.message}
                    placeholder="Lass uns gerne eine Nachricht da..."
                />
            {/snippet}
        </FormControl>
        <FormFieldErrors />
    </FormField>

    <div class="flex justify-center">
        <Button type="submit" disabled={$submitting} class="w-full">
            {$submitting ? "Wird gesendet..." : "RSVP senden"}
        </Button>
    </div>
</form>
