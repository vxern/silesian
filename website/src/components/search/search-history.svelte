<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import constants from "$lib/constants/core";
  import Loading from "../../components/meta/loading.svelte";

  dayjs.extend(relativeTime);

  const { searchHistory, popularSearches } = $props();
</script>

{#snippet button(item)}
  <button
    class="cursor-pointer p-4 flex flex-col gap-y-1 bg-zinc-800 hover:bg-zinc-700 outline-1 outline-zinc-600 rounded-lg"
    onclick={() => goto(`/lemma/${encodeURIComponent(item.lemma)}`)}
  >
    <span class="text-start text-zinc-300 hover:text-zinc-200">
      {item.lemma}
    </span>
    <span class="text-xs text-end text-zinc-500">
      {dayjs(item.created_at).fromNow()}
    </span>
  </button>
{/snippet}

{#snippet article({ type, title, items })}
  <article class="flex flex-col gap-y-4 items-center">
    <span class="text-blue-500 text-xl">
      {title}
    </span>
    {#if items.length > 0}
      <section class="w-full grid grid-cols-7 gap-2 items-center">
        {#each items.slice(0, constants.limits.searchHistory - 1) as item}
          {@render button(item)}
        {/each}
        {#if items.length > constants.limits.searchHistory}
          <button
            class="h-full cursor-pointer p-4 flex flex-col justify-center bg-zinc-800 hover:bg-zinc-700 outline-1 outline-zinc-600 text-zinc-400 rounded-lg"
            onclick={() => goto(`/lemma/${encodeURIComponent(item.lemma)}`)}
          >
            {m["meta.etc"]()}
          </button>
        {/if}
      </section>
    {:else if type === "history"}
      {m["components.search_history.no_search_history"]()}
    {:else if type === "popular"}
      {m["components.search_history.no_popular_searches"]()}
    {/if}
  </article>
{/snippet}

<section class="flex flex-col gap-y-8">
  {@render article({
    type: "history",
    title: m["routes.search.history"](),
    items: searchHistory,
  })}
  {@render article({
    type: "popular",
    title: m["routes.search.popular"](),
    items: popularSearches,
  })}
</section>
