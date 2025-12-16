<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import EntryTable from "../../../components/entries/entry-table.svelte";
  import constants from "$lib/constants/core";
  import BackButton from "../../../components/interactions/back-button.svelte";
  import { page } from "$app/stores";

  const { data } = $props();

  onMount(() => {
    const id = $page.url.hash.slice(1);
    if (!$page.url.hash) {
      return;
    }

    const entry = document.getElementById(id);
    if (!entry) {
      return;
    }

    entry.scrollIntoView();
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
    <EntryTable
      entries={data.entries}
      mode="edit"
      noneText={m["routes.entries.drafts.none"]()}
    />
  </Page.Contents>
</Page.Root>
