<script>
  import Page from "../../components/page/index.js";
  import SearchBar from "../../components/search-bar/search-bar.svelte";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
</script>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <SearchBar />
  </Page.Header>
</Page.Root>
