<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";

  let history = $state();
  async function fetchSources() {
    const response = await fetch("/api/search/history");
    const entries = await response.json();

    history = entries;
  }

  onMount(() => {
    fetchSources();
  });
</script>

<section class="flex flex-col gap-y-4">
  {#each history as item}
    <article class="p-4 bg-zinc-800 rounded-lg">
      {item.term ?? m["unknown"]()}
    </article>
  {/each}
</section>
