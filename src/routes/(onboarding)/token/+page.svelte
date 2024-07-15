<script>
  import { enhance } from '$app/forms';
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;

  /** @type {HTMLButtonElement} */
  let submitButton;

  let isSubmitting = false;

  /** @type {(e: ClipboardEvent) => void} */
  function handlePaste(e) {
    e.preventDefault();
    const paste = e.clipboardData?.getData('text');
    const inputs = document.querySelectorAll('.input');
    inputs.forEach((input, i) => {
      // @ts-ignore
      input.focus();
      // @ts-ignore
      input.value = paste[i];
    });
  }

  /** @type {(event: any) => void} */
  function handleInput(event) {
    const current = document.activeElement;
    const inputs = [...document.querySelectorAll('.input')];
    const currentIndex = current ? inputs.indexOf(current) : 0;

    if (event.key == 'Backspace') {
      if (currentIndex === 0) return;

      // @ts-ignore
      inputs[currentIndex - 1].value = '';
      // @ts-ignore
      inputs[currentIndex - 1]?.focus();
      return;
    }
    // @ts-ignore
    inputs[currentIndex + 1]?.focus();
  }

  /** @type {(event: any) => void} */
  function handleLastInput(event) {
    const current = document.activeElement;
    const inputs = [...document.querySelectorAll('.input')];
    const currentIndex = current ? inputs.indexOf(current) : 0;

    if (event.key == 'Backspace') {
      // @ts-ignore
      inputs[currentIndex - 1].value = '';
      // @ts-ignore
      inputs[currentIndex - 1]?.focus();
      return;
    }

    // @ts-ignore
    current?.blur();
    submitButton.click();
  }

  /** @type {import('./$types').SubmitFunction} */
  const formSubmit = ({ formElement, formData }) => {
    if (form?.missing) form.missing = false;
    isSubmitting = true;

    let token = '';
    const inputs = [...formElement.getElementsByClassName('input')];
    for (let input of inputs) {
      // @ts-ignore
      token += inputs[inputs.indexOf(input)].value;
    }

    formData.set('token', token);

    return async ({ result, update }) => {
      isSubmitting = false;
      update();
    };
  };

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
  Please enter the code we've send to {data.email}. Quaerat fugiat ut assumenda excepturi exercitationem
  quasi.
</p>
<form class="relative grid grid-cols-6 gap-4 px-4" method="POST" use:enhance={formSubmit}>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    on:keyup={handleInput}
    type="text"
    class="input input-bordered w-12"
    autocomplete="off"
    maxlength="1"
    autofocus
  />
  <input
    on:keyup={handleInput}
    type="text"
    class="input input-bordered w-12"
    autocomplete="off"
    maxlength="1"
  />
  <input
    on:keyup={handleInput}
    type="text"
    class="input input-bordered w-12"
    autocomplete="off"
    maxlength="1"
  />
  <input
    on:keyup={handleInput}
    type="text"
    class="input input-bordered w-12"
    autocomplete="off"
    maxlength="1"
  />
  <input
    on:keyup={handleInput}
    type="text"
    class="input input-bordered w-12"
    autocomplete="off"
    maxlength="1"
  />
  <input
    on:keyup={handleLastInput}
    type="text"
    class="input input-bordered w-12"
    autocomplete="off"
    maxlength="1"
  />
  <button bind:this={submitButton} class="hidden" />
  {#if form?.missing}<p class="col-span-full text-error">Invalid token found! Please try again.</p>{/if}
  {#if form?.invalid}<p class="col-span-full text-error">Invalid credentials!</p>{/if}
  {#if form?.error}<p class="col-span-full text-error">{form?.message}</p>{/if}
  {#if isSubmitting}
    <div class="col-span-full w-20 mx-auto">
      <span class="loading loading-spinner loading-md" />
    </div>
  {/if}
</form>
<p class="py-6">
  Can't find the email? Check your spam folder, or <a href="/" class="btn-link">send a new email</a>.
</p>
