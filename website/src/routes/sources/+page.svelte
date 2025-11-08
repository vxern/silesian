<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import Loading from "../../components/meta/loading.svelte";
  import {
    compareLicence,
    compareAccess,
    compareProgress,
    compareName,
    compareAuthors,
    completion,
  } from "../../helpers/sources.js";
  import Table from "../../components/layout/table/index.js";
  import Button from "../../components/interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import AddLineIcon from "~icons/mingcute/add-line";

  // TODO(vxern): Use proper permissions.
  const hasPermission = true;

  let sources = $state();
  async function fetchSources() {
    const response = await fetch("/api/sources");
    const results = await response.json();

    sources = results
      .sort(
        (a, b) =>
          compareLicence(a.licence, b.licence) ||
          compareAccess(a.access, b.access) ||
          compareProgress(a, b) ||
          compareName(a.name, b.name) ||
          compareAuthors(a.authors, b.authors)
      )
      .reverse();
  }

  onMount(() => {
    fetchSources();
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.sources.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root view="wide">
  <Page.Header>
    <Page.Title title={m["routes.sources.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <section>
      <Button
        colour="green"
        icon={AddLineIcon}
        onclick={() => goto("/sources/new")}
      >
        {m["routes.sources.add"]()}
      </Button>
    </section>
    {#if sources}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {m["routes.sources.table.work"]()}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {m["routes.sources.table.authors.authors"]()}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {m["routes.sources.table.access.access"]()}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {m["routes.sources.table.licence.licence"]()}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {m["routes.sources.table.progress.progress"]()}
            </Table.HeaderCell>
            {#if hasPermission && sources.length > 0}
              <Table.HeaderCell />
            {/if}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each sources as source}
            <Table.Row>
              <Table.HeaderCell scope="row" class="w-[35%]">
                {#if !source.name}
                  {m["meta.unknown"]()}
                {:else if source.url}
                  <a href={source.url} class="underline underline-offset-3">
                    {source.name}
                  </a>
                {:else}
                  {source.name}
                {/if}
              </Table.HeaderCell>
              <Table.Cell class="w-[30%]">
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
              </Table.Cell>
              <Table.Cell class="w-[10%]">
                {#if !source.access}
                  {m["meta.unknown"]()}
                {:else if source.access === "closed"}
                  <span class="text-red-500">
                    {m["accesses.closed"]()}
                  </span>
                {:else if source.access === "limited"}
                  <span class="text-yellow-500">
                    {m["accesses.limited"]()}
                  </span>
                {:else if source.access === "open"}
                  <span class="text-green-500">
                    {m["accesses.open"]()}
                  </span>
                {/if}
              </Table.Cell>
              <Table.Cell class="w-[15%]">
                {#if !source.licence}
                  {m["meta.unknown"]()}
                {:else if source.licence === "proprietary"}
                  <span class="text-red-500">
                    {m["licences.proprietary"]()}
                  </span>
                {:else if source.licence === "granted"}
                  <span class="text-green-500">
                    {m["licences.granted"]()}
                  </span>
                {:else if source.licence === "public"}
                  <span class="text-green-500">
                    {m["licences.public"]()}
                  </span>
                {:else if source.redistributable}
                  <span class="text-green-500">
                    {source.licence}
                  </span>
                {:else}
                  <span class="text-yellow-500">
                    {source.licence}
                  </span>
                {/if}
              </Table.Cell>
              <Table.Cell class="w-[10%]">
                {#if !source.redistributable}
                  {m["meta.none"]()}
                {:else}
                  {m["routes.sources.table.progress.numbers"]({
                    imported: source.imported_entry_count,
                    total: source.total_entry_count,
                  })}
                  <br />
                  {#snippet percentage()}
                    {m["routes.sources.table.progress.percentage"]({
                      percentage: (completion(source) * 100).toFixed(1),
                    })}
                  {/snippet}
                  {#if completion(source) > 0.95}
                    <span class="text-green-500">
                      {@render percentage()}
                    </span>
                  {:else if completion(source) > 0.5}
                    <span class="text-yellow-500">
                      {@render percentage()}
                    </span>
                  {:else}
                    <span class="text-red-500">
                      {@render percentage()}
                    </span>
                  {/if}
                {/if}
              </Table.Cell>
              {#if hasPermission}
                <Table.Cell>
                  <Button
                    colour="green"
                    icon={Pencil2LineIcon}
                    onclick={() => goto(`/sources/${source.id}/edit`)}
                  />
                </Table.Cell>
              {/if}
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
