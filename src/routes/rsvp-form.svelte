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
    import CardHeader from "$lib/components/ui/card/card-header.svelte";
    import CardTitle from "$lib/components/ui/card/card-title.svelte";
    import CardDescription from "$lib/components/ui/card/card-description.svelte";
    import { Card } from "$lib/components/ui/card";
    import CardContent from "$lib/components/ui/card/card-content.svelte";

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
        onUpdated: ({ form }) => {
            if (form.valid) {
                queryClient.invalidateQueries({ queryKey: ["rsvp"] });
                onSuccess?.();
            }
        },
    });

    const { form: formData, enhance, submitting } = form;
</script>

<div class="grid h-[calc(100vh-70px)] lg:grid-cols-2">
    <div class="bg-muted relative hidden lg:block">
        <img
            src="https://utfs.io/f/KCC3bUkGRI6aFyCvgbwHjyJ3cMg4oerqVXQlb2YLUfCxNR19"
            alt="Jana & Philipp"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
    <div>
        <Card class="border-none py-40">
            <CardHeader class="text-center">
                <CardTitle>RSVP – Répondez s'il vous plaît</CardTitle>
                <CardDescription>
                    Lass uns wissen, ob du kommen kannst!
                </CardDescription>
            </CardHeader>
            <CardContent class="w-full">
                <form
                    method="POST"
                    use:enhance
                    class="flex w-full flex-col items-center"
                >
                    <FormFieldset {form} name="attending">
                        <RadioGroup
                            bind:value={$formData.attending}
                            name="attending"
                        >
                            <div class="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    {#snippet children({ props })}
                                        <RadioGroupItem
                                            value="true"
                                            {...props}
                                        />
                                        <FormLabel class="font-normal"
                                            >Ja, ich komme!</FormLabel
                                        >
                                    {/snippet}
                                </FormControl>
                            </div>
                            <div class="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    {#snippet children({ props })}
                                        <RadioGroupItem
                                            value="false"
                                            {...props}
                                        />
                                        <FormLabel class="font-normal"
                                            >Nein, ich komme nicht.</FormLabel
                                        >
                                    {/snippet}
                                </FormControl>
                            </div>
                        </RadioGroup>
                        <FormFieldErrors />
                    </FormFieldset>
                    <FormField {form} name="message" class="py-4 w-full">
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
                        <Button
                            type="submit"
                            disabled={$submitting}
                            class="w-full"
                        >
                            {$submitting ? "Wird gesendet..." : "RSVP senden"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</div>
