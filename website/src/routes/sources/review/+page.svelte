<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import SourceTable from "../../../components/sources/source-table.svelte";
  import constants from "$lib/constants/core";
  import Loading from "../../../components/meta/loading.svelte";
  import BackButton from "../../../components/interactions/back-button.svelte";

  let sources = $state();
  async function fetchSources() {
    const response = await fetch("/api/sources/pending");
    sources = await response.json();
  }

  onMount(() => {
    fetchSources();
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.sources.review.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.review.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.sources.review.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/sources")} />
    </Page.Actions>
    {#if sources}
      {#if sources.length > 0}
        <SourceTable {sources} mode="review" />
      {:else}
        {m["routes.sources.review.none"]()}
      {/if}
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
