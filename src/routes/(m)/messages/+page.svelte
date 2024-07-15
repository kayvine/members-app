<script>
  export let data;

  $: notifications = data.messages ?? [];
</script>

<main>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    {#each notifications as n (n.id)}
      <div class="chat chat-start">
        <div class="chat-header">
          {n.sender} <time class="text-xs opacity-50">{new Date(n.timestamp).toLocaleString('nl-BE')}</time>
        </div>
        <div class="chat-bubble">{@html n.text}</div>
      </div>
      {#if n.metadata}
        <div>{JSON.stringify(n.metadata)}</div>
      {/if}
    {/each}

    <div class="chat chat-end">
      <div class="chat-bubble chat-bubble-primary">You underestimate my power!</div>
    </div>
    <div class="chat chat-start">
      <div class="chat-header">Obi-Wan Kenobi <time class="text-xs opacity-50">13:11</time></div>
      <div class="chat-bubble">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quibusdam ipsam tempore tempora
        laboriosam corporis laudantium quisquam perspiciatis reiciendis qui dolor repellat, a sapiente iste
        earum cupiditate, eos dolorum accusantium. Minus hic odio quibusdam enim incidunt numquam excepturi ut
        a, ipsum ullam perferendis aliquam molestias illo dolores vero doloremque error ad mollitia
        consequatur maxime eligendi.
      </div>
    </div>

    <div class="flex justify-end my-2">
      <button class="btn btn-outline btn-primary rounded-full">Some possible answer</button>
    </div>
    <div class="flex justify-end my-2">
      <button class="btn btn-outline btn-primary rounded-full">Some other possible answer</button>
    </div>
    <div class="flex justify-end my-2">
      <button class="btn btn-outline btn-primary rounded-2xl">Contact us</button>
    </div>
  </div>
</main>
