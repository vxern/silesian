<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import EntryTable from "../../components/entries/entry-table.svelte";
  import Button from "../../components/interactions/button.svelte";
  import Loading from "../../components/meta/loading.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Badge from "../../components/interactions/badge.svelte";
  import ChecksLineIcon from "~icons/mingcute/checks-line";
  import Edit4LineIcon from "~icons/mingcute/edit-4-line";
  import constants from "$lib/constants/core";

  // TODO(vxern): Get this from the user's permission.
  const hasPermission = true;

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.entries.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.entries.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if hasPermission}
      <Page.Actions>
        <Button
          colour="green"
          icon={AddLineIcon}
          onclick={() => goto("/entries/new")}
        >
          {m["routes.entries.actions.add"]()}
        </Button>
        <Button
          colour="yellow"
          icon={Edit4LineIcon}
          class="relative"
          onclick={() => goto("/entries/drafts")}
        >
          {m["routes.entries.actions.drafts"]()}
          <Badge text={data.draftCount} colour="yellow" />
        </Button>
        <section class="flex-1"></section>
        <Button
          colour="blue"
          icon={ChecksLineIcon}
          class="relative"
          onclick={() => goto("/entries/review")}
        >
          {m["routes.entries.actions.review"]()}
          <Badge text={data.pendingCount} colour="blue" />
        </Button>
      </Page.Actions>
    {/if}
    <EntryTable entries={data.entries} noneText={m["routes.entries.none"]()} />
  </Page.Contents>
</Page.Root>
