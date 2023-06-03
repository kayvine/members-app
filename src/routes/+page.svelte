<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  if (browser) [
    goto('/intro')
  ]
</script>

<div class="grid justify-center content-center min-h-screen">
  <progress class="progress w-56"></progress>
</div>