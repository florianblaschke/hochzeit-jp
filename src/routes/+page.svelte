<script lang="ts">
    import { authClient } from "$lib/auth/client";

    const session = authClient.useSession();

    async function loginWithEmail() {
        const { data, error } = await authClient.signIn.magicLink({
            email: "user@email.com", // required
            name: "my-name",
        });
    }
</script>

<div>
    {#if $session.data}
        <div>
            <p>
                {$session?.data?.user.name}
            </p>
            <button
                on:click={async () => {
                    await authClient.signOut();
                }}
            >
                Sign Out
            </button>
        </div>
    {:else}
        <button
            on:click={async () => {
                await loginWithEmail();
            }}
        >
            Continue with GitHub
        </button>
    {/if}
</div>
