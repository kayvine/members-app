<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { subscription } from '$lib/stores/subscription';

  /** @type {import('./$types').PageData} */
  export let data;
  
  /** @type {import('./$types').ActionData} */
  export let form;  

  if (form?.success) {
    console.log('saving...');
    subscription.set({
      ...$subscription, 
      firstName: form.firstName, 
      lastName: form.lastName,
      nrn: data.user.nrn,
      email: data.user.email,
    });
  }
</script>

<main class="card col-span-2 bg-base-100 shadow-lg">
  <div class="card-body">
    <h2 class="card-title">{#if $subscription.firstName}Welcome, {$subscription.firstName} {$subscription.lastName}{:else}Welcome!{/if}</h2>
    {#if !$subscription?.firstName}
    <p>We would like to some more information to get started.</p>
    <form method="post" use:enhance>
      <div class="form-control w-full">
        <label for="firstName" class="label">
          <span class="label-text">First name</span>
        </label>      
        <input name="firstName" type="text" value={form?.firstName ?? ''} class="input input-bordered w-full max-w-sm" class:input-error={form?.errors?.firstName}/>
        {#if form?.errors?.firstName}
        <div class="label">
          <span class="label-text-alt text-error">Please enter your first name</span>
        </div>
        {/if}
      </div>
      
      <div class="form-control w-full">
        <label for="lastName" class="label">
          <span class="label-text">Last name</span>
        </label>      
        <input name="lastName" type="text" value={form?.lastName ?? ''} class="input input-bordered w-full max-w-sm" class:input-error={form?.errors?.lastName}/>
        {#if form?.errors?.lastName}
        <div class="label">
          <span class="label-text-alt text-error">Please enter your last name</span>
        </div>
        {/if}
      </div>

      <div class="mt-4">
        <button class="btn btn-primary">Save</button>
      </div>
    </form>
    {:else}
    <p>To become a member you will need to provide the necesary information. At the end of the form you will be able to view and sign the documents to complete your subscription.</p>
    <div class="card-actions justify-end">
      <button type="button" on:click={() => goto('/subscription/personal')} class="btn btn-primary">Let's get started!</button>
    </div>
    {/if}
  </div>
</main>
