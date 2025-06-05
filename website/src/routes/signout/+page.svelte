<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants";
</script>

<svelte:head>
  <meta name="description" content={m["routes.signout.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.signout.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.signout.title"]()} />
  </Page.Header>
</Page.Root>
