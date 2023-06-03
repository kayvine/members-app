<script>
  import { page } from '$app/stores';
  import { subscription } from '$lib/stores/subscription';
  import { notifications } from '$lib/stores/notifications';

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: subscription.set({ ...$subscription, ...data.user });
  $: name = $subscription.firstName && `${$subscription.firstName} ${$subscription.lastName}`;
  $: hasNotifications = $notifications.length > 0;
</script>

<div class="lg:container  min-h-[calc(100vh-5rem)]">
  <header class="pt-4 pr-4 pl-4">
    <div class="navbar bg-base-100 mb-4 shadow-lg rounded-box">
      <div class="flex-1">
        <a href="/dashboard" aria-current="page" aria-label="Dashboard" class="flex-0 btn btn-ghost px-2">
          <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl"><span class="lowercase text-primary">members</span> <span class="uppercase text-base-content">UI</span></div>
        </a>
      </div>
      <div class="flex-none">
        {#if name}
        <p class="text-sm/6 font-semibold uppercase pr-4">{name}</p>
        {/if}
        <a class="btn btn-ghost btn-circle" href="/messages" aria-current="page" aria-label="Messages">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            {#if hasNotifications}<span class="badge badge-xs badge-primary indicator-item"></span>{/if}
          </div>
        </a>
        <form method="POST" action="/logout">
          <button class="btn btn-ghost">Logout</button>
        </form>
        <!--<div class="dropdown dropdown-end">
          <button tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="/images/stock/vince-veras-AJIqZDAUD7A-unsplash.jpg" alt="" />
            </div>
          </button>
          <ul tabindex="-1" class="menu menu-compact dropdown-content card card-compact w-64 mt-3 p-2 shadow bg-base-100 rounded-box">
            <li class="card-body">
              <div class="card-body">
                <h3 class="card-title">Card title!</h3>
                <p>you can use any element as a dropdown.</p>
              </div>
            </li>
            <li><a href="/login">Logout</a></li>
          </ul>
        </div>-->
      </div>
    </div>
  </header>

  <div class="grid grid-cols-content gap-4 px-4">
    <slot />
    test: {$page.data.title}
  </div>
</div>
