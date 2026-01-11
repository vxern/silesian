<script>
  import { onMount } from "svelte";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AuthorTable from "../../../components/authors/author-table.svelte";
  import constants from "$lib/constants/core";
  import BackButton from "../../../components/interactions/back-button.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={m["routes.authors.review.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.authors.review.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.authors.review.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/authors")} />
    </Page.Actions>
    <AuthorTable
      authors={data.authors}
      mode="review"
      noneText={m["routes.authors.review.none"]()}
    />
  </Page.Contents>
</Page.Root>
