<script lang="ts">
    import type { AllUsersWithRsvp } from "$lib/queries/user";
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
    import Card from "./ui/card/card.svelte";
    import {
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from "./ui/card";
    import Badge from "./ui/badge/badge.svelte";

    let { guest }: { guest: AllUsersWithRsvp[number] } = $props();

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
        $deleteMutation.mutate(guest.user.id);
    };
</script>

<li class:opacity-50={$deleteMutation.isPending}>
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center justify-between">
                {guest.user.name}
                <!-- <AlertDialog>
                    <AlertDialogTrigger
                        class={cn(buttonVariants({ variant: "destructive" }))}
                    >
                        {$deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete guest with
                                email: {guest.user.email}? This action cannot be
                                undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                class={cn(
                                    buttonVariants({ variant: "destructive" }),
                                )}
                                onclick={handleDelete}>Delete</AlertDialogAction
                            >
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog> -->
            </CardTitle>
            {#if guest.rsvp?.createdAt}
                <CardDescription>
                    Zugesagt: {new Date(
                        guest.rsvp.createdAt,
                    ).toLocaleDateString()}
                </CardDescription>
            {/if}
        </CardHeader>
        <CardContent class="space-y-4">
            {#if typeof guest.rsvp?.attending === "undefined"}
                <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold">Antwort:</p>
                    <Badge>Ausstehend</Badge>
                </div>
            {/if}
            <div class="flex items-center gap-2">
                <p class="text-sm font-semibold">Nachricht:</p>
                <p class="text-sm">{guest.rsvp?.message || "keine"}</p>
            </div>
        </CardContent>
        <CardFooter class="justify-end">
            {#if $deleteMutation.error}
                <p class="text-xs text-destructive mt-1">
                    Failed to delete: {$deleteMutation.error.message}
                </p>
            {/if}
        </CardFooter>
    </Card>
</li>
