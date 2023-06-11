<script>
  import { enhance } from '$app/forms';

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;

  console.log(data);
</script>

<!-- <div class="text-sm breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li> 
    <li><a href="/documents">Documents</a></li> 
    <li>Add Document</li>
  </ul>
</div> -->

<h2 class="card-title">Personal</h2>
<form method="POST" use:enhance>
  <div class="form-control w-1/2">
    <label for="postal" class="label">
      <span class="label-text">Postal</span>
    </label>
    <input
      name="postal"
      type="text"
      class="input input-bordered w-full max-w-sm"
      class:input-error={form?.errors?.postal}
    />
    {#if form?.errors?.postal}
      <div class="label">
        <span class="label-text-alt text-error">Please enter your postal</span>
      </div>
    {/if}
  </div>

  <div class="form-control w-1/2">
    <label for="city" class="label">
      <span class="label-text">City</span>
    </label>
    <input
      name="city"
      type="text"
      class="input input-bordered w-full max-w-sm"
      class:input-error={form?.errors?.city}
    />
    {#if form?.errors?.city}
      <div class="label">
        <span class="label-text-alt text-error">Please enter your city</span>
      </div>
    {/if}
  </div>

  <div class="mt-4">
    <button type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
