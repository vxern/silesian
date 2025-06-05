<script>
  import Page from "../../components/page/index.js";
  import SearchBar from "../../components/search-bar/search-bar.svelte";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import constants from "$lib/constants";
</script>

<svelte:head>
  <meta name="description" content={m["routes.word.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.word.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <SearchBar />
  </Page.Header>
</Page.Root>
