<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.contribute.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.contribute.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.contribute.title"]()} />
  </Page.Header>
  <Page.Divider />
</Page.Root>
