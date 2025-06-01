<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import { onMount } from "svelte";

  // TODO(vxern): Sources should be sorted by progress > licence > access > work > authors

  let sources = $state();
  async function fetchSources() {
    const response = await fetch("/api/sources");
    sources = Object.values(await response.json());
  }

  onMount(() => {
    fetchSources();
  });

  function completion(entries) {
    if (entries.total === 0) {
      return 1;
    }

    return entries.imported / entries.total;
  }
</script>

<svelte:head>
  <title>silesian.eu — {m["routes.sources.title"]()}</title>
</svelte:head>

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.sources.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if !sources}
      {m["loading"]()}
    {:else}
      <table class="border-separate border-spacing-1 text-left">
        <thead class="text-blue-400">
          <tr>
            <th scope="col" class="border-b-1 border-b-zinc-700">
              {m["routes.sources.table.work"]()}
            </th>
            <th scope="col" class="border-b-1 border-b-zinc-700">
              {m["routes.sources.table.authors.authors"]()}
            </th>
            <th scope="col" class="border-b-1 border-b-zinc-700">
              {m["routes.sources.table.access.access"]()}
            </th>
            <th scope="col" class="border-b-1 border-b-zinc-700">
              {m["routes.sources.table.licence.licence"]()}
            </th>
            <th scope="col" class="border-b-1 border-b-zinc-700">
              {m["routes.sources.table.progress.progress"]()}
            </th>
          </tr>
        </thead>
        <tbody>
          {#each sources as source}
            <tr>
              <th scope="row" class="w-[35%] border-b-1 border-b-zinc-800">
                {#if !source.name}
                  {m["unknown"]()}
                {:else if source.link}
                  <a href={source.link} class="underline underline-offset-3">
                    {source.name}
                  </a>
                {:else}
                  {source.name}
                {/if}
              </th>
              <td class="w-[35%] border-b-1 border-b-zinc-800">
                {#if !source.authors}
                  {m["unknown"]()}
                {:else if source.authors === "community"}
                  <i>
                    {m["routes.sources.table.authors.community"]()}
                  </i>
                {:else if source.authors.length > 0}
                  {source.authors.join(" · ")}
                {:else}
                  {m["unknown"]()}
                {/if}
              </td>
              <td class="w-[10%] border-b-1 border-b-zinc-800">
                {#if !source.access}
                  {m["unknown"]()}
                {:else if source.access === "closed"}
                  <span class="text-red-400">
                    {m["routes.sources.table.access.closed"]()}
                  </span>
                {:else if source.access === "limited"}
                  <span class="text-yellow-400">
                    {m["routes.sources.table.access.limited"]()}
                  </span>
                {:else if source.access === "open"}
                  <span class="text-green-400">
                    {m["routes.sources.table.access.open"]()}
                  </span>
                {/if}
              </td>
              <td class="w-[15%] border-b-1 border-b-zinc-800">
                {#if !source.licence}
                  {m["unknown"]()}
                {:else if source.licence === "proprietary"}
                  <span class="text-red-400">
                    {m["routes.sources.table.licence.proprietary"]()}
                  </span>
                {:else if source.licence === "public"}
                  <span class="text-green-400">
                    {m["routes.sources.table.licence.public"]()}
                  </span>
                {:else}
                  <span class="text-green-400">
                    {source.licence}
                  </span>
                {/if}
              </td>
              <td class="w-[5%] border-b-1 border-b-zinc-800">
                {#if !source.redistributable}
                  {m["none"]()}
                {:else if !source.entries}
                  {m["unknown"]()}
                {:else}
                  {m["routes.sources.table.progress.numbers"]({
                    imported: source.entries.imported ?? m["unknown"](),
                    total: source.entries.total ?? m["unknown"](),
                  })}
                  <br />
                  {#snippet percentage()}
                    {m["routes.sources.table.progress.percentage"]({
                      percentage: (completion(source.entries) * 100).toFixed(1),
                    })}
                  {/snippet}
                  {#if source.entries.imported === undefined || source.entries.total === undefined}
                    {m["routes.sources.table.progress.percentage"]({
                      percentage: m["unknown"](),
                    })}
                  {:else if completion(source.entries) > 0.95}
                    <span class="text-green-400">
                      {@render percentage()}
                    </span>
                  {:else if completion(source.entries) > 0.5}
                    <span class="text-yellow-400">
                      {@render percentage()}
                    </span>
                  {:else}
                    <span class="text-red-400">
                      {@render percentage()}
                    </span>
                  {/if}
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </Page.Contents>
</Page.Root>
