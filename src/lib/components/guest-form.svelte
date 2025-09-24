<script lang="ts">
    import { createMutation, useQueryClient } from "@tanstack/svelte-query";
    import { SheetClose } from "$lib/components/ui/sheet";
    import Input from "./ui/input/input.svelte";
    import Label from "./ui/label/label.svelte";
    import { Button, buttonVariants } from "./ui/button";
    import { cn } from "$lib/utils";

    let {
        onSuccess,
    }: {
        onSuccess?: () => void;
    } = $props();

    const queryClient = useQueryClient();
    let email = $state("");

    const createGuestMutation = createMutation({
        mutationFn: async (guestData: { email: string }) => {
            const response = await fetch("/api/guests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(guestData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to create guest");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guests"] });
            email = "";
            onSuccess?.();
        },
    });

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if (!email.trim()) {
            return;
        }
        $createGuestMutation.mutate({ email: email.trim() });
    };
</script>

<form onsubmit={handleSubmit} class="space-y-4 p-4">
    <div class="space-y-2">
        <Label for="guest-email">Email Address</Label>
        <Input
            id="guest-email"
            type="email"
            bind:value={email}
            required
            placeholder="Enter guest email"
            disabled={$createGuestMutation.isPending}
        />
    </div>

    {#if $createGuestMutation.error}
        <div class="text-destructive text-sm">
            {$createGuestMutation.error.message}
        </div>
    {/if}

    <div class="flex justify-end space-x-2">
        <SheetClose
            type="button"
            class={cn(buttonVariants({ variant: "secondary" }))}
            disabled={$createGuestMutation.isPending}
        >
            Cancel
        </SheetClose>

        <Button
            type="submit"
            disabled={$createGuestMutation.isPending || !email.trim()}
        >
            {$createGuestMutation.isPending ? "Adding..." : "Add Guest"}
        </Button>
    </div>
</form>
