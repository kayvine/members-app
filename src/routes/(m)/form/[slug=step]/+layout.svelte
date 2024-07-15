<script>
  import { page } from '$app/stores';
  import { capitalize } from '$lib/utils';

  /** @type {import('./$types').LayoutData} */
  export let data;

  /** @type {(slug: string) => boolean} */
  $: isCompleted = (slug) => {
    const index = data.forms.findIndex((form) => form.slug === slug);
    const steps = [1, 2];
    return steps && steps.includes(index);
  };

  /** @type {(slug: string) => string} */
  $: getSymbol = (slug) => {
    if (slug === $page.params.slug) return '●'; // ★
    return isCompleted(slug) ? '✓' : '';
  };
</script>

<main class="card bg-base-100 shadow-lg">
  <div class="card-body">
    <slot />
  </div>
</main>

<div class="p-4 bg-base-100 text-base-content rounded-box shadow-lg">
  <ul class="steps steps-vertical">
    {#each data.forms as form}
      <li
        data-content={getSymbol(form.slug)}
        class="step"
        class:step-primary={form.slug === $page.params.slug}
      >
        {#if isCompleted(form.slug)}
          <a href="/subscription/{form.slug}">{capitalize(form.slug)}</a>
        {:else}
          {capitalize(form.slug)}
        {/if}
      </li>
    {/each}
  </ul>
</div>

<!-- <div>boop</div> -->

<!-- <ul class="p-4 bg-base-100 text-base-content rounded-box shadow-lg">
  {#each data.forms as form}
    <li class:bordered={form.slug === $page.params.slug}>
      <a href="/{form.slug}" class="link link-hover">{capitalize(form.slug)}</a>
    </li>
  {/each}
</ul> -->
