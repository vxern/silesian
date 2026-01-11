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

  const { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={m["routes.sources.drafts.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.drafts.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.sources.drafts.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/sources")} />
    </Page.Actions>
    <SourceTable
      sources={data.sources}
      mode="edit"
      noneText={m["routes.sources.drafts.none"]()}
    />
  </Page.Contents>
</Page.Root>
