<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  if (browser) {
    goto('/intro');
  }
</script>

<div class="grid justify-center content-center min-h-[calc(100vh-theme(space.16))]">
  <progress class="progress w-56" />
</div>
