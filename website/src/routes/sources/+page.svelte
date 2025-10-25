<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import SourceTable from "../../components/sources/source-table.svelte";
  import sources from "$lib/constants/sources";
  import constants from "$lib/constants/core";
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

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.sources.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <SourceTable sources={Object.values(sources)} />
  </Page.Contents>
</Page.Root>
