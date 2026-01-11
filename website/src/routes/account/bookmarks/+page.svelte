<script>
  import { m } from "$lib/paraglide/messages";
  import { page } from "$app/state";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import EntryTable from "../../../components/entries/entry-table.svelte";
  import BackButton from "../../../components/interactions/back-button.svelte";

  const { data } = $props();

  onMount(() => {
    // TODO(vxern): IMPORTANT - Do this on the server side.
    if (!page.data.session) {
      goto("/login");
    }
  });
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.account.bookmarks.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.bookmarks.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.bookmarks.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/account")} />
    </Page.Actions>
    <EntryTable
      entries={data.entries}
      noneText={m["routes.account.bookmarks.none"]()}
    />
  </Page.Contents>
</Page.Root>
