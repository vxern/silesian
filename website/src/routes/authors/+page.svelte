<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import AuthorTable from "../../components/authors/author-table.svelte";
  import constants from "$lib/constants/core";
  import Button from "../../components/interactions/button.svelte";
  import Badge from "../../components/interactions/badge.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import ChecksLineIcon from "~icons/mingcute/checks-line";
  import Edit4LineIcon from "~icons/mingcute/edit-4-line";

  // TODO(vxern): Get this from the user's permission.
  const hasPermission = true;

  const { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={m["routes.authors.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.authors.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.authors.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if hasPermission}
      <Page.Actions>
        <Button
          colour="green"
          icon={AddLineIcon}
          onclick={() => goto("/authors/new")}
        >
          {m["routes.authors.actions.add"]()}
        </Button>
        <Button
          colour="yellow"
          icon={Edit4LineIcon}
          class="relative"
          onclick={() => goto("/authors/drafts")}
        >
          {m["routes.authors.actions.drafts"]()}
          <Badge text={data.draftCount} colour="yellow" />
        </Button>
        <section class="flex-1"></section>
        <Button
          colour="blue"
          icon={ChecksLineIcon}
          class="relative"
          onclick={() => goto("/authors/review")}
        >
          {m["routes.authors.actions.review"]()}
          <Badge text={data.pendingCount} colour="blue" />
        </Button>
      </Page.Actions>
    {/if}
    <AuthorTable authors={data.authors} noneText={m["routes.authors.none"]()} />
  </Page.Contents>
</Page.Root>
