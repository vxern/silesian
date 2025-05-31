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
          <th scope="col">{m["routes.sources.table.work"]()}</th>
          <th scope="col">{m["routes.sources.table.authors"]()}</th>
          <th scope="col">{m["routes.sources.table.access.access"]()}</th>
          <th scope="col">{m["routes.sources.table.licence.licence"]()}</th>
          <th scope="col">{m["routes.sources.table.progress"]()}</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.values(sources) as dictionary}
          <tr>
            <th scope="row" class="w-[30%]">
              {#if dictionary.link}
                <a href={dictionary.link} class="underline underline-offset-3">
                  {dictionary.name}
                </a>
              {:else}
                {dictionary.name}
              {/if}
            </th>
            <td class="w-[30%]">
              {dictionary.authors.join(" · ")}
            </td>
            <td class="w-[10%]">
              {#if dictionary.access === "closed"}
                <span class="text-red-400">
                  {m[`routes.sources.table.access.closed`]()}
                </span>
              {:else if dictionary.access === "limited"}
                <span class="text-yellow-400">
                  {m[`routes.sources.table.access.limited`]()}
                </span>
              {:else}
                <span class="text-green-400">
                  {m[`routes.sources.table.access.open`]()}
                </span>
              {/if}
            </td>
            <td class="w-[15%]">
              {#if dictionary.licence === "proprietary"}
                <span class="text-red-400">
                  {m[`routes.sources.table.licence.proprietary`]()}
                </span>
              {:else if dictionary.licence === "public"}
                <span class="text-green-400">
                  {m[`routes.sources.table.licence.public`]()}
                </span>
              {:else}
                <span class="text-green-400">
                  {dictionary.licence}
                </span>
              {/if}
            </td>
            <td class="w-[5%]">0%</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Page.Contents>
</Page.Root>
