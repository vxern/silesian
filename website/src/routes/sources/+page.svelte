<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import { onMount } from "svelte";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import SourceTable from "../../components/sources/source-table.svelte";
  import Loading from "../../components/meta/loading.svelte";
  import constants from "$lib/constants";

  let sources = $state();
  async function fetchSources() {
    const response = await fetch("/api/sources");
    const entries = await response.json();

    sources = Object.values(entries);
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

{#if sources}
  <Page.Root>
    <Page.Header>
      <Page.Title title={m["routes.sources.title"]()} />
    </Page.Header>
    <Page.Divider />
    <Page.Contents>
      <SourceTable {sources} />
    </Page.Contents>
  </Page.Root>
{:else}
  <Loading />
{/if}
