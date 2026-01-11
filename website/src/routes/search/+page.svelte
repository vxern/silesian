<script>
  import Page from "../../components/page/index.js";
  import { m } from "$lib/paraglide/messages";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import SearchBar from "../../components/search/search-bar.svelte";
  import SearchHistory from "../../components/search/search-history.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={m["routes.search.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.search.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.search.title"]()} />
    <SearchBar />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <SearchHistory
      searchHistory={data.searchHistory}
      popularSearches={data.popularSearches}
    />
  </Page.Contents>
</Page.Root>
