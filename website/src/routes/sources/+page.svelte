<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import sources from "$lib/sources.js";

  // TODO(vxern): Dictionaries should be served over the API.
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
    <table class="border-separate border-spacing-1 text-zinc-300 text-left">
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
            {m["routes.sources.table.progress"]()}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each Object.values(sources) as dictionary}
          <tr>
            <th scope="row" class="w-[30%] border-b-1 border-b-zinc-800">
              {#if dictionary.link}
                <a href={dictionary.link} class="underline underline-offset-3">
                  {dictionary.name}
                </a>
              {:else}
                {dictionary.name}
              {/if}
            </th>
            <td class="w-[30%] border-b-1 border-b-zinc-800">
              {#if dictionary.authors === "community"}
                <i>
                  {m["routes.sources.table.authors.community"]()}
                </i>
              {:else if dictionary.authors.length > 0}
                {dictionary.authors.join(" · ")}
              {:else}
                <i>
                  {m["routes.sources.table.authors.unknown"]()}
                </i>
              {/if}
            </td>
            <td class="w-[10%] border-b-1 border-b-zinc-800">
              {#if dictionary.access === "closed"}
                <span class="text-red-400">
                  {m["routes.sources.table.access.closed"]()}
                </span>
              {:else if dictionary.access === "limited"}
                <span class="text-yellow-400">
                  {m["routes.sources.table.access.limited"]()}
                </span>
              {:else if dictionary.access === "open"}
                <span class="text-green-400">
                  {m["routes.sources.table.access.open"]()}
                </span>
              {/if}
            </td>
            <td class="w-[15%] border-b-1 border-b-zinc-800">
              {#if dictionary.licence === "proprietary"}
                <span class="text-red-400">
                  {m["routes.sources.table.licence.proprietary"]()}
                </span>
              {:else if dictionary.licence === "public"}
                <span class="text-green-400">
                  {m["routes.sources.table.licence.public"]()}
                </span>
              {:else}
                <span class="text-green-400">
                  {dictionary.licence}
                </span>
              {/if}
            </td>
            <td class="w-[5%] border-b-1 border-b-zinc-800">0%</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Page.Contents>
</Page.Root>
