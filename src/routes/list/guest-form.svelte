<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import {
        FormControl,
        FormField,
        FormFieldErrors,
        FormLabel,
    } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { SheetClose } from "$lib/components/ui/sheet";
    import { cn } from "$lib/utils";
    import { useQueryClient } from "@tanstack/svelte-query";
    import {
        type Infer,
        superForm,
        type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { guestSchema, type GuestSchema } from "./schema";

    let {
        onSuccess,
        form: formShape,
    }: {
        onSuccess?: () => void;
        form: SuperValidated<Infer<GuestSchema>>;
    } = $props();

    const queryClient = useQueryClient();

    const form = superForm(formShape, {
        validators: zodClient(guestSchema),
        onUpdated: ({ form }) => {
            if (form.valid) {
                queryClient.invalidateQueries({ queryKey: ["guests"] });
                onSuccess?.();
            }
        },
    });

    const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" class="space-y-4 p-4" use:enhance>
    <FormField {form} name="email">
        <FormControl>
            {#snippet children({ props })}
                <FormLabel>Email Address</FormLabel>
                <Input {...props} bind:value={$formData.email} />
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

    <div class="flex justify-end space-x-2">
        <SheetClose
            type="button"
            class={cn(buttonVariants({ variant: "secondary" }))}
            disabled={$submitting}
        >
            Cancel
        </SheetClose>

        <Button type="submit" disabled={$submitting}>
            {$submitting ? "Adding..." : "Add Guest"}
        </Button>
    </div>
</form>
