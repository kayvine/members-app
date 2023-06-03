<script>
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { capitalize } from '$lib/utils';

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;

  console.log(data.item);
  console.log(data.item2);

  $: current = data.forms.find(form => form.slug === $page.params.slug) ?? { fields: [] };
</script>

<!-- <div class="text-sm breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li> 
    <li><a href="/documents">Documents</a></li> 
    <li>Add Document</li>
  </ul>
</div> -->

<h2 class="card-title">{data['page-title']}</h2>
<form method="POST" use:enhance>
  {#each current?.fields as field}
    <div class="form-control w-full">
      {#if field.type === 'text'}
        <label for={field.name} class="label">
          <span class="label-text">{capitalize(field.name)}</span>
        </label>      
        <input name={field.name} type={field.type} class="input input-bordered w-full max-w-sm" class:input-error={form?.errors?.[field.name]}/>
        {#if form?.errors?.[field.name]}
          <div class="label">
            <span class="label-text-alt text-error">Please enter your TODO</span>
          </div>
        {/if}
      {:else if field.type === 'checkbox'}
      <label class="label cursor-pointer">
        <input type="checkbox" class="checkbox" checked={!!field.value} />
        <span class="label-text">Remember me</span>
      </label>
      {:else if field.type === 'radio'}
        <label class="label cursor-pointer">
          <input type="radio" name="radio-10" class="radio checked:bg-blue-500" />
          <span class="label-text">Blue pill</span> 
        </label>    
      {/if}
    </div>
  {/each}

  <div class="mt-4">
    <button type="submit" class="btn btn-primary">Save</button>
  </div>
</form>

{data.item2?.options}