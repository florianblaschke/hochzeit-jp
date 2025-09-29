<script lang="ts">
    import type { guest as guestSchema } from "$lib/server/db/schema";
    import { cn } from "$lib/utils";
    import { createMutation, useQueryClient } from "@tanstack/svelte-query";
    import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
    } from "./ui/alert-dialog/index";
    import { buttonVariants } from "./ui/button";

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
        $deleteMutation.mutate(guest.id);
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
    <AlertDialog>
        <AlertDialogTrigger
            class={cn(buttonVariants({ variant: "destructive" }))}
        >
            {$deleteMutation.isPending ? "Deleting..." : "Delete"}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete guest with email: {guest.email}?
                    This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    class={cn(buttonVariants({ variant: "destructive" }))}
                    onclick={handleDelete}>Delete</AlertDialogAction
                >
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</li>
