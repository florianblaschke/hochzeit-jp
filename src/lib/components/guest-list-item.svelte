<script lang="ts">
    import { createMutation, useQueryClient } from "@tanstack/svelte-query";
    import type { guest as guestSchema } from "$lib/server/db/schema";
    import { Button } from "./ui/button";

    interface Props {
        guest: typeof guestSchema.$inferSelect;
    }

    let { guest }: Props = $props();

    const queryClient = useQueryClient();

    const deleteMutation = createMutation({
        mutationFn: async (guestId: string) => {
            const response = await fetch(`/api/guests/${guestId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete guest");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guests"] });
        },
    });

    const handleDelete = () => {
        if (
            confirm(
                `Are you sure you want to delete guest with email: ${guest.email}?`,
            )
        ) {
            $deleteMutation.mutate(guest.id);
        }
    };
</script>

<li
    class="flex items-center justify-between p-4 rounded-lg shadow-sm border transition-opacity"
    class:opacity-50={$deleteMutation.isPending}
>
    <div class="flex-1">
        <p class="text-sm font-medium">{guest.email}</p>
        <p class="text-xs text-muted-foreground">
            Added: {new Date(guest.createdAt).toLocaleDateString()}
        </p>
        {#if $deleteMutation.error}
            <p class="text-xs text-destructive mt-1">
                Failed to delete: {$deleteMutation.error.message}
            </p>
        {/if}
    </div>

    <Button
        type="button"
        onclick={handleDelete}
        disabled={$deleteMutation.isPending}
        variant="destructive"
    >
        {$deleteMutation.isPending ? "Deleting..." : "Delete"}
    </Button>
</li>
