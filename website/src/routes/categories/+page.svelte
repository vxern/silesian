<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import CategoryTable from "../../components/categories/category-table.svelte";
  import constants from "$lib/constants/core";
  import Loading from "../../components/meta/loading.svelte";
  import Button from "../../components/interactions/button.svelte";
  import Badge from "../../components/interactions/badge.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import ChecksLineIcon from "~icons/mingcute/checks-line";
  import Edit4LineIcon from "~icons/mingcute/edit-4-line";

  // TODO(vxern): Get this from the user's permission.
  const hasPermission = true;

  // TODO(vxern): Get this dynamically.
  const draftCount = 16;
  const reviewCount = 9;

  let categories = $state();
  async function fetchCategories() {
    const response = await fetch("/api/categories");
    categories = await response.json();
  }

  onMount(() => {
    fetchCategories();
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.categories.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.categories.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.categories.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if hasPermission}
      <Page.Actions>
        <Button
          colour="green"
          icon={AddLineIcon}
          onclick={() => goto("/categories/new")}
        >
          {m["routes.categories.actions.add"]()}
        </Button>
        <Button
          colour="yellow"
          icon={Edit4LineIcon}
          onclick={() => goto("/categories/drafts")}
        >
          {m["routes.categories.actions.drafts"]()}
          <Badge text={draftCount} colour="yellow" />
        </Button>
        <section class="flex-1"></section>
        <Button
          colour="blue"
          icon={ChecksLineIcon}
          onclick={() => goto("/categories/review")}
        >
          {m["routes.categories.actions.review"]()}
          <Badge text={reviewCount} colour="blue" />
        </Button>
      </Page.Actions>
    {/if}
    {#if categories}
      <CategoryTable {categories} noneText={m["routes.categories.none"]()} />
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
