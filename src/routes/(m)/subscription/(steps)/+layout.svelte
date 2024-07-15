<script>
  import { page } from '$app/stores';
  import { capitalize } from '$lib/utils';

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: currentPage = $page.url.pathname.split('/').pop() || '';

  /** @type {(slug: string) => boolean} */
  $: isCompleted = (slug) => {
    const index = data.steps.findIndex((step) => step === slug);
    const steps = data.profile.completedSteps;
    return steps && steps.includes(index + 1);
  };

  /** @type {(slug: string) => string} */
  $: getSymbol = (slug) => {
    if (slug === currentPage) return '●'; // ★
    return isCompleted(slug) ? '✓' : '';
  };
</script>

<ul class="menu bg-base-200 lg:menu-horizontal rounded-box">
  {#each data.steps as step}
    <li class:active={step === currentPage}>
      {capitalize(step)}
    </li>
    <!-- <li
      data-content={getSymbol(form.slug)}
      class=""
      class:active={form.slug === $page.params.slug}
    >
      {#if isCompleted(form.slug)}
        <a href="/subscription/{form.slug}">{capitalize(form.slug)}</a>
      {:else}
        {capitalize(form.slug)}
      {/if}
    </li> -->
  {/each}
</ul>

<div class="flex items-start gap-x-4 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <main class="flex-1">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <slot />
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          natus praesentium quidem explicabo, laborum quasi. Dolores fugiat, repellendus, debitis ex quis
          blanditiis maxime, repellat voluptate explicabo quia ratione. Voluptas, id!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          natus praesentium quidem explicabo, laborum quasi. Dolores fugiat, repellendus, debitis ex quis
          blanditiis maxime, repellat voluptate explicabo quia ratione. Voluptas, id!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          natus praesentium quidem explicabo, laborum quasi. Dolores fugiat, repellendus, debitis ex quis
          blanditiis maxime, repellat voluptate explicabo quia ratione. Voluptas, id!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          natus praesentium quidem explicabo, laborum quasi. Dolores fugiat, repellendus, debitis ex quis
          blanditiis maxime, repellat voluptate explicabo quia ratione. Voluptas, id!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis!
        </div>
        <div class="max-w-prose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia aut impedit nostrum illum rem,
          voluptatem nobis provident porro pariatur, eius voluptate. Magnam sapiente labore, quaerat
          aspernatur fuga culpa nihil facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          natus praesentium quidem explicabo, laborum quasi. Dolores fugiat, repellendus, debitis ex quis
          blanditiis maxime, repellat voluptate explicabo quia ratione. Voluptas, id!
        </div>
      </div>
    </div>
  </main>

  <aside class="sticky top-10 shrink-0 hidden md:block w-64">
    <div class="card bg-base-100 text-base-content shadow-lg">
      <ul class="card-body steps steps-vertical">
        {#each data.steps as step}
          <li
            data-content={getSymbol(step)}
            class="step"
            class:step-primary={step === currentPage}
          >
            {#if isCompleted(step)}
              <a href="/subscription/{step}">{capitalize(step)}</a>
            {:else}
              {capitalize(step)}
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </aside>
</div>

<!-- <ul class="p-4 bg-base-100 text-base-content rounded-box shadow-lg">
  {#each data.forms as form}
    <li class:bordered={form.slug === $page.params.slug}>
      <a href="/{form.slug}" class="link link-hover">{capitalize(form.slug)}</a>
    </li>
  {/each}
</ul> -->
