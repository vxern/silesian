<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import constants from "$lib/constants";
  import Loading from "../../components/meta/loading.svelte";

  dayjs.extend(relativeTime);

  let history = $state();
  async function fetchSources() {
    const response = await fetch(
      `/api/search/history?limit=${constants.limits.searchHistory}`
    );
    const entries = await response.json();

    history = entries;
  }

  let popular = $state();
  async function fetchPopular() {
    const response = await fetch(
      `/api/search/popular?limit=${constants.limits.searchHistory}`
    );
    const entries = await response.json();

    popular = entries;
  }

  onMount(() => {
    fetchSources();
    fetchPopular();
  });
</script>

{#snippet button(item)}
  <button
    class="cursor-pointer p-4 flex flex-col gap-y-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg"
    onclick={() => goto(`/word/${encodeURIComponent(item.term)}`)}
  >
    <span class="text-start text-zinc-300 hover:text-zinc-200">{item.term}</span
    >
    <span class="text-xs text-end text-zinc-500">
      {dayjs(item.created_at).fromNow()}
    </span>
  </button>
{/snippet}

{#snippet article({ title, items })}
  <article class="flex flex-col gap-y-4 items-center">
    <span class="text-blue-500 text-xl">
      {title}
    </span>
    {#if !items}
      <Loading />
    {:else}
      <section class="w-full grid grid-cols-7 gap-2 items-center">
        {#if items.length >= constants.limits.searchHistory}
          {#each items.slice(0, constants.limits.searchHistory - 1) as item}
            {@render button(item)}
          {/each}
          <button
            class="h-full cursor-pointer p-4 flex flex-col justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg"
            onclick={() => goto(`/word/${encodeURIComponent(item.term)}`)}
          >
            {m["meta.etc"]()}
          </button>
        {:else}
          {#each items as item}
            {@render button(item)}
          {/each}
        {/if}
      </section>
    {/if}
  </article>
{/snippet}

<section class="flex flex-col gap-y-8">
  {@render article({ title: m["routes.search.history"](), items: history })}
  {@render article({ title: m["routes.search.popular"](), items: popular })}
</section>
