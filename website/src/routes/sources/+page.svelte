<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import { onMount } from "svelte";
  import HomeButton from "../../components/home-button/home-button.svelte";

  let sources = $state();
  async function fetchSources() {
    const response = await fetch("/api/sources");
    const entries = await response.json();

    sources = Object.values(entries)
      .sort(
        (a, b) =>
          compareLicence(a.licence, b.licence) ||
          compareAccess(a.access, b.access) ||
          compareProgress(a.progress, b.progress) ||
          compareName(a.name, b.name) ||
          compareAuthors(a, b)
      )
      .reverse();
  }

  function compareLicence(a, b) {
    if (a === b) {
      return 0;
    }

    if (!a) {
      return -1;
    } else if (!b) {
      return 1;
    }

    if (a === "proprietary") {
      return -1;
    } else if (b === "proprietary") {
      return 1;
    }

    if (a === "public") {
      return -1;
    }

    return compareName(a, b);
  }

  function compareAccess(a, b) {
    if (a === b) {
      return 0;
    }

    if (!a) {
      return -1;
    } else if (!b) {
      return 1;
    }

    if (a === "closed") {
      return -1;
    } else if (b === "closed") {
      return 1;
    }

    if (a === "limited") {
      return -1;
    } else if (b === "limited") {
      return 1;
    }

    return 0;
  }

  function compareProgress(a, b) {
    if (a === b) {
      return 0;
    }

    if (!a) {
      return -1;
    } else if (!b) {
      return 1;
    }

    const completionA = completion(a);
    const completionB = completion(b);

    if (Number.isNaN(completionA) && Number.isNaN(completionB)) {
      return 0;
    } else if (Number.isNaN(completionA)) {
      return -1;
    } else if (Number.isNaN(completionB)) {
      return 1;
    }

    if (completionA > completionB) {
      return 1;
    } else if (completionA < completionB) {
      return -1;
    }

    if (a.total < b.total) {
      return 1;
    } else if (a.total > b.total) {
      return -1;
    } else {
      return 0;
    }
  }

  function compareName(a, b) {
    return b.localeCompare(a, "pl", { sensitivity: "base" });
  }

  function compareAuthors(a, b) {
    if (!a && !b) {
      return 0;
    } else if (!a) {
      return -1;
    } else if (!b) {
      return 1;
    }

    return a.length > b.length ? 1 : -1;
  }

  function completion(progress) {
    if (progress.total === 0) {
      return 1;
    }

    return progress.imported / progress.total;
  }

  onMount(() => {
    fetchSources();
  });
</script>

<svelte:head>
  <title>silesian.eu — {m["routes.sources.title"]()}</title>
</svelte:head>

<HomeButton />

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
        <thead class="text-blue-500">
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
                  {source.authors
                    .toSorted((a, b) => compareName(a, b))
                    .join(" · ")}
                {:else}
                  {m["unknown"]()}
                {/if}
              </td>
              <td class="w-[10%] border-b-1 border-b-zinc-800">
                {#if !source.access}
                  {m["unknown"]()}
                {:else if source.access === "closed"}
                  <span class="text-red-500">
                    {m["routes.sources.table.access.closed"]()}
                  </span>
                {:else if source.access === "limited"}
                  <span class="text-yellow-500">
                    {m["routes.sources.table.access.limited"]()}
                  </span>
                {:else if source.access === "open"}
                  <span class="text-green-500">
                    {m["routes.sources.table.access.open"]()}
                  </span>
                {/if}
              </td>
              <td class="w-[15%] border-b-1 border-b-zinc-800">
                {#if !source.licence}
                  {m["unknown"]()}
                {:else if source.licence === "proprietary"}
                  <span class="text-red-500">
                    {m["routes.sources.table.licence.proprietary"]()}
                  </span>
                {:else if source.licence === "public"}
                  <span class="text-green-500">
                    {m["routes.sources.table.licence.public"]()}
                  </span>
                {:else}
                  <span class="text-green-500">
                    {source.licence}
                  </span>
                {/if}
              </td>
              <td class="w-[5%] border-b-1 border-b-zinc-800">
                {#if !source.redistributable}
                  {m["none"]()}
                {:else if !source.progress}
                  {m["unknown"]()}
                {:else}
                  {m["routes.sources.table.progress.numbers"]({
                    imported: source.progress.imported ?? m["unknown"](),
                    total: source.progress.total ?? m["unknown"](),
                  })}
                  <br />
                  {#snippet percentage()}
                    {m["routes.sources.table.progress.percentage"]({
                      percentage: (completion(source.progress) * 100).toFixed(
                        1
                      ),
                    })}
                  {/snippet}
                  {#if source.progress.imported === undefined || source.progress.total === undefined}
                    {m["routes.sources.table.progress.percentage"]({
                      percentage: m["unknown"](),
                    })}
                  {:else if completion(source.progress) > 0.95}
                    <span class="text-green-500">
                      {@render percentage()}
                    </span>
                  {:else if completion(source.progress) > 0.5}
                    <span class="text-yellow-500">
                      {@render percentage()}
                    </span>
                  {:else}
                    <span class="text-red-500">
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
