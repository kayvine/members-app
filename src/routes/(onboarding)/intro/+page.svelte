<script>
  import { goto } from '$app/navigation';
</script>

<h1 class="text-5xl font-bold">Hello there</h1>
<p class="py-6">
  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
  deleniti eaque aut repudiandae et a id nisi.
</p>
<div class="flex flex-col md:flex-row justify-around">
  <button class="btn btn-primary" on:click={() => goto('/csam')}>This is the first time</button>
  <button class="btn btn-ghost" on:click={() => goto('/login')}>I already used this before</button>
</div>
