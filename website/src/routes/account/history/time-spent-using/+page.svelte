<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import constants from "$lib/constants/core";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Page from "../../../../components/page/index.js";
  import BackButton from "../../../../components/interactions/back-button.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.account.history.time_spent_using.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.history.time_spent_using.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.history.time_spent_using.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/account/statistics")} />
    </Page.Actions>
  </Page.Contents>
</Page.Root>
