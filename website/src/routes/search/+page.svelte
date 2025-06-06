<script>
  import Page from "../../components/page/index.js";
  import { m } from "$lib/paraglide/messages";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants";
  import SearchBar from "../../components/search-bar/search-bar.svelte";
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

<NavigationSection />

<Page.Root>
  <Page.Header>
    <SearchBar />
  </Page.Header>
</Page.Root>
