<script>
  import { enhance } from '$app/forms';
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;

  const userData = data.user;

  // Put something to paste into the console
  console.log('251TK8');

  /** @type {HTMLButtonElement} */
  let submitButton;

  let isSubmitting = false;

  /** @type {(e: any) => void} */
  function handlePaste(e) {
    if (e.target.localName !== 'input') return;
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const inputs = document.querySelectorAll('.input');
    inputs.forEach((input, i) => {
      // @ts-ignore
      input.focus();
      // @ts-ignore
      input.value = paste[i];
    });
    submitButton.click();
  }

  /** @type {() => void} */
  function goToNext() {
    const current = document.activeElement;
    const inputs = [...document.querySelectorAll('.input')];
    const currentIndex = current ? inputs.indexOf(current) : 0;
    // @ts-ignore
    inputs[currentIndex + 1]?.focus();
  }

  onMount(() => {
    document.addEventListener('paste', handlePaste, {
      capture: true,
    });
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener('paste', handlePaste, {
        capture: true,
      });
    }
  });
</script>

<h1 class="text-5xl font-bold">Come on in</h1>
<p class="py-6">
  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
  deleniti eaque aut repudiandae et a id nisi.
</p>
<form
  class="grid grid-cols-6 gap-4 px-4"
  method="POST"
  use:enhance={({ formElement, formData }) => {
    let code = '';
    const inputs = [...formElement.getElementsByClassName('input')];
    for (let input of inputs) {
      // @ts-ignore
      code += inputs[inputs.indexOf(input)].value;
    }

    formData.set('code', code);
    formData.set('user', JSON.stringify(userData));
  }}
>
  <!-- svelte-ignore a11y-autofocus -->
  <input on:input|preventDefault={goToNext} type="text" class="input w-12" maxlength="1" autofocus />
  <input on:input|preventDefault={goToNext} type="text" class="input w-12" maxlength="1" />
  <input on:input|preventDefault={goToNext} type="text" class="input w-12" maxlength="1" />
  <input on:input|preventDefault={goToNext} type="text" class="input w-12" maxlength="1" />
  <input on:input|preventDefault={goToNext} type="text" class="input w-12" maxlength="1" />
  <input on:input|preventDefault={() => submitButton.click()} type="text" class="input w-12" maxlength="1" />
  <button bind:this={submitButton} class="hidden" />
  {#if isSubmitting}
    <div class="relative col-span-full w-20 h-20 mx-auto">
      <div class="radial-progress absolute inset-0 text-base-300" style="--value:100;" />
      <div class="radial-progress absolute inset-0 animate-spin" style="--value:25;" />
    </div>
  {/if}
  {#if form?.invalid}<p class="col-span-full text-error">Invalid credentials!</p>{/if}
</form>
