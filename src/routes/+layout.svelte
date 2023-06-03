<script>
  // import { page } from '$app/stores';
  import '../app.css';
</script>

<!-- <svelte:head>
  <title>{$page.data.title}</title>
</svelte:head> -->

<slot />
<footer class="footer footer-center h-16 p-4 mt-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
  </div>
</footer>

<style>
  :global(body) {
    background-image: radial-gradient(hsla(var(--bc)/.2) .5px,hsla(var(--b2)/1) .5px);
    background-size: 5px 5px;
    min-height: 100vh;
  }
</style>
