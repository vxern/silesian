<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import EntryTable from "../../../components/entries/entry-table.svelte";
  import constants from "$lib/constants/core";
  import Loading from "../../../components/meta/loading.svelte";
  import BackButton from "../../../components/interactions/back-button.svelte";

  let entries = $state();
  async function fetchEntries() {
    const response = await fetch("/api/entries/drafts");
    entries = await response.json();
  }

  onMount(() => {
    fetchEntries();
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.entries.drafts.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.drafts.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.entries.drafts.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/entries")} />
    </Page.Actions>
    {#if entries}
      {#if entries.length > 0}
        <EntryTable {entries} />
      {:else}
        {m["routes.entries.drafts.none"]()}
      {/if}
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
