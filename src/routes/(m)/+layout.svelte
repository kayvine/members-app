<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { themeStore } from '$lib/stores/theme';

  /** @type {import('./$types').LayoutData} */
  export let data;

  /** @type any */
  let newMessages;

  $: ({ supabase, profile, session } = data);
  $: theme = $themeStore.current;
  $: name = profile && `${profile.firstName} ${profile.lastName}`;
  $: email = session?.user && `${session.user.email}`;
  // $: hasNotifications = messages && data.messages.some((messages) => !messages.read)
  $: hasNotifications = data.messages?.some((message) => !message.read);

  const setTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    themeStore.set({
      current: newTheme,
      preference: $themeStore.preference === 'system' ? newTheme : 'system',
    });
  };

  onMount(() => {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        console.log(payload);
        newMessages = payload;
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  });
</script>

<div class="min-h-[calc(100vh-theme(space.16))]">
  <nav class="bg-base-100">
    <div class="navbar border-b border-base-300 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex-1">
        <a href="/dashboard" aria-current="page" aria-label="Dashboard" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            class="w-12 h-12 fill-current text-primary bg-clip-content -ml-4"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.654 11 16 14.885V27.51l3.885 1.294v3.561l11.653 3.885V15.856l-3.884 1.295V11ZM21.18 29.236l6.474 2.158V18.515l2.59-.863v16.801l-9.064-3.02v-2.197Z"
            />
          </svg>
          <div class="flex font-display">
            <span class="font-semibold">Members</span>
            <span class="text-primary font-bold">App</span>
          </div>
        </a>
      </div>
      <div class="flex-none">
        {#if name}
          <p class="font-semibold pr-4">{name}</p>
        {/if}

        <button class="btn btn-ghost btn-circle">
          <label class="swap swap-rotate">
            <input type="checkbox" checked={theme === 'dark'} on:click={setTheme} />
            <!-- sun icon -->
            <svg class="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              />
            </svg>
            <!-- moon icon -->
            <svg class="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              />
            </svg>
          </label>
        </button>

        <div class="tooltip tooltip-bottom" data-tip="{hasNotifications ? 'View notifications' : ''}">
          <a class="btn btn-ghost btn-circle" href="/messages" aria-current="page" aria-label="Messages">
            <div class="indicator">
              <span class="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {#if hasNotifications}
                <span class="badge badge-xs badge-primary indicator-item" />
              {/if}
            </div>
          </a>
        </div>

        <form method="POST" action="/logout">
          <button class="btn btn-ghost" type="submit">Logout</button>
        </form>

        <div class="dropdown dropdown-end">
          <button tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="/images/stock/vince-veras-AJIqZDAUD7A-unsplash.jpg" alt="" />
            </div>
          </button>
          <ul tabindex="-1" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li class="card">
              <div class="card-body flex items-start gap-0">
                <h3 class="">{#if name}{name}{:else}no name{/if}</h3>
                <p>{email}</p>
              </div>
            </li>
            <li class="menu-title">{name}<br />{email}</li>
            <li><a href="/login">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <header class="bg-base-100 shadow">
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <h1 class="text-xl font-semibold">{$page.data.title ?? 'Welcome'}</h1>
    </div>
  </header>

  <slot />

  <!-- <p class="px-4">test: {JSON.stringify(data.profile, null, 2)}</p> -->
</div>
