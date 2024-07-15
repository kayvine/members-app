<script>
  import { enhance } from '$app/forms';

  /** @type {import('./$types').ActionData} */
  export let form;

  let isSubmitting = false;

  /** @type {'intro'|'oidc'|'login'} */
  $: state =
    form?.missing || form?.invalid || form?.success === false ? 'login' : form?.user ? 'login' : 'intro';

  /** @type {import('./$types').SubmitFunction} */
  const formSubmit = ({ formData }) => {
    isSubmitting = true;

    if (form?.user) formData.append('metadata', JSON.stringify(form.user));

    return async ({ result, update }) => {
      isSubmitting = false;
      update();
    };
  };
</script>

<!-- {#if state === 'intro' && !form?.user && !form?.success} -->
{#if state === 'intro'}
  <h1 class="text-5xl font-bold">Hello there</h1>
  <p class="py-6">
    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
    deleniti eaque aut repudiandae et a id nisi.
  </p>
  <div class="flex flex-col md:flex-row justify-center space-x-4">
    <button class="btn btn-primary" on:click={() => (state = 'oidc')}>This is the first time</button>
    <button class="btn btn-ghost" on:click={() => (state = 'login')}>I already used this before</button>
  </div>
{/if}

{#if state === 'oidc'}
  <p class="py-6">Redirecting user to login with FAS/CSAM after which they will arrive on the next page.</p>
  <form method="POST" action="?/oidc">
    <button class="btn btn-ghost">continue</button>
  </form>
{/if}

{#if state === 'login'}
  <!-- {#if form?.success}
    <h1 class="text-5xl font-bold">Check your mail</h1>
    <p class="py-6">
      An email has been sent to {form?.email}. 👍<br />Please check your email for a code to log into the
      website.
    </p>
  {:else} -->
  <h1 class="text-5xl font-bold">Come on in</h1>
  <p class="py-6">
    Provident fugiat ut assumenda excepturi exercitatem quasi. <br />Fill in your email and press enter.
  </p>
  <form
    class="relative flex w-full max-w-sm mx-auto space-x-4"
    method="POST"
    action="?/login"
    use:enhance={formSubmit}
  >
    <div class="form-control w-full">
      <input
        name="email"
        type="email"
        value={form?.email ?? ''}
        placeholder="Your email *"
        class="input input-bordered w-full max-w-xs"
        class:input-error={form?.missing || form?.invalid}
        disabled={isSubmitting}
      />
      {#if form?.invalid || form?.missing}
        <div class="label">
          <span class="label-text-alt text-error">Please enter a valid email address</span>
        </div>
      {/if}
    </div>
    <button class="btn btn-square btn-primary" disabled={isSubmitting}>
      {#if isSubmitting}
        <span class="loading loading-spinner" />
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      {/if}
    </button>
  </form>
  <!-- {/if} -->
{/if}
