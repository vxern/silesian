<script>
  import { m } from "$lib/paraglide/messages";
  import constants from "$lib/constants/core";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Page from "../../../../components/page/index.js";
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.account.history.searches.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.history.searches.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.history.searches.title"]()} />
  </Page.Header>
  <Page.Divider />
</Page.Root>
