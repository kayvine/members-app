<script>
  import { goto } from '$app/navigation';

  /** @type {import('./$types').PageData} */
  export let data;

  $: name = data.profile && `${data.profile.firstName} ${data.profile.lastName}`;
  $: isMember = data.profile.memberNumber;
</script>

<main>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title">
          {#if name}Welcome, {name}{:else}Welcome!{/if}
        </h1>

        {#if isMember}
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-current"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  /></svg
                >
              </div>
              <div class="stat-title">Total Likes</div>
              <div class="stat-value text-primary">25.6K</div>
              <div class="stat-desc">21% more than last month</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-current"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  /></svg
                >
              </div>
              <div class="stat-title">Page Views</div>
              <div class="stat-value text-secondary">2.6M</div>
              <div class="stat-desc">21% more than last month</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <div class="avatar online">
                  <div class="w-16 rounded-full">
                    <img src="/images/stock/vince-veras-AJIqZDAUD7A-unsplash.jpg" alt="profile" />
                  </div>
                </div>
              </div>
              <div class="stat-value">86%</div>
              <div class="stat-title">Tasks done</div>
              <div class="stat-desc text-secondary">31 tasks remaining</div>
            </div>
          </div>
        {/if}

        <p class="max-w-[75ch]">
          To become a member you will need to provide the necessary information. At the end of the form you
          will be able to view and sign the documents to complete your subscription.
        </p>
        <div class="card-actions justify-end">
          <button type="button" on:click={() => goto('/subscription/personal')} class="btn btn-primary">
            Let's get started!
          </button>
          <button type="button" class="btn btn-secondary"> Let's get started! </button>
          <button type="button" class="btn btn-accent"> Let's get started! </button>
        </div>

        <div class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>New software update available.</span>
        </div>

        <div class="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>Your purchase has been confirmed!</span>
        </div>
        <div class="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            /></svg
          >
          <span>Warning: Invalid email address!</span>
        </div>
        <div class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>Error! Task failed successfully.</span>
        </div>
      </div>
    </div>
  </div>
</main>
