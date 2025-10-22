<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";

  // TODO(vxern): Temporary.
  const username = "vxern";
  const email = "vxern@wordcollector.co.uk";
</script>

<svelte:head>
  <meta name="description" content={m["routes.account.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.title"]()} />
  </Page.Header>
  <Page.Divider />
  <table class="border-separate border-spacing-1 text-left">
    <thead class="text-blue-500">
      <tr>
        <th scope="col" class="border-b-1 border-b-zinc-700"
          >{m["routes.account.attributes.username"]()}</th
        >
        <th scope="col" class="border-b-1 border-b-zinc-700"
          >{m["routes.account.attributes.email"]()}</th
        >
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="w-[35%] border-b-1 border-b-zinc-800">{username}</td>
        <td class="w-[35%] border-b-1 border-b-zinc-800">{email}</td>
        <!-- <td class="w-[35%] border-b-1 border-b-zinc-800">
          {#if !source.authors}
            {m["meta.unknown"]()}
          {:else if source.authors === "community"}
            <i>
              {m["routes.sources.table.authors.community"]()}
            </i>
          {:else if source.authors.length > 0}
            {source.authors.join(" · ")}
          {:else}
            {m["meta.unknown"]()}
          {/if}
        </td>
        <td class="w-[10%] border-b-1 border-b-zinc-800">
          {#if !source.access}
            {m["meta.unknown"]()}
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
            {m["meta.unknown"]()}
          {:else if source.licence === "proprietary"}
            <span class="text-red-500">
              {m["routes.sources.table.licence.proprietary"]()}
            </span>
          {:else if source.licence === "granted"}
            <span class="text-green-500">
              {m["routes.sources.table.licence.granted"]()}
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
            {m["meta.none"]()}
          {:else if !source.progress}
            {m["meta.unknown"]()}
          {:else}
            {m["routes.sources.table.progress.numbers"]({
              imported: source.progress.imported ?? m["meta.unknown"](),
              total: source.progress.total ?? m["meta.unknown"](),
            })}
            <br />
            {#snippet percentage()}
              {m["routes.sources.table.progress.percentage"]({
                percentage: (completion(source.progress) * 100).toFixed(1),
              })}
            {/snippet}
            {#if source.progress.imported === undefined || source.progress.total === undefined}
              {m["routes.sources.table.progress.percentage"]({
                percentage: m["meta.unknown"](),
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
        </td> -->
      </tr>
    </tbody>
  </table>
</Page.Root>
