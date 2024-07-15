<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';
  import { browser } from '$app/environment';
  import { themeStore, MEDIA } from '$lib/stores/theme';

  import '../app.css';

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: ({ supabase, session } = data);
  $: if (browser) {
    if ($themeStore.preference === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', $themeStore.current);
    }
  }

  /** @type {(this: MediaQueryList, ev: MediaQueryListEvent) => void} */
  const mediaHandler = ({ matches: isDark }) => {
    const theme = isDark ? 'dark' : 'light';
    themeStore.set({
      current: theme,
      preference: 'system',
    });
  };

  onMount(() => {
    // Always listen to System preference
    const media = window.matchMedia(MEDIA);
    media.addEventListener('change', mediaHandler);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      console.log(event, _session);
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => {
      media.removeEventListener('change', mediaHandler);
      subscription.unsubscribe();
    };
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Geologica&display=swap" rel="stylesheet" />

  <title>{$page.data.title}</title>

  <script>
    const stored = window.localStorage.getItem('members:theme');
    if (stored) {
      const theme = JSON.parse(stored);
      document.documentElement.setAttribute('data-theme', theme.current);
    }
  </script>
</svelte:head>

<slot />
<footer class="footer footer-center h-16 p-4 bg-base-300 text-base-content">
  <div>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by VINE Industries Ltd</p>
  </div>
</footer>
