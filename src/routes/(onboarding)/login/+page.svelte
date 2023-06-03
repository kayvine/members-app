<script>
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<h1 class="text-5xl font-bold">Come on in</h1>
<p class="py-6">Provident fugiat ut assumenda excepturi exercitatem quasi. Fill in your email and press enter.</p>
<form class="flex flex-row w-full max-w-xs mx-auto" method="POST">
  <div class="form-control w-full">
    <input name="email" type="email" value={form?.email ?? ''} placeholder="Your email" class="input input-bordered w-full max-w-xs" class:input-error={form?.missing || form?.invalid}/>
    {#if form?.invalid || form?.missing}
    <div class="label">
      <span class="label-text-alt text-error">Please enter a valid email address</span>
    </div>
    {/if}
  </div>
</form>
