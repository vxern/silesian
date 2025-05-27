<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import SearchBar from "../../../components/search-bar/search-bar.svelte";
</script>

<svelte:head>
  <title>silesian.eu — {m["routes.word.title"]()}</title>
</svelte:head>

<Page.Root>
  <Page.Header>
    <SearchBar />
  </Page.Header>
  <Page.Contents>
    <Page.Card></Page.Card>
  </Page.Contents>
</Page.Root>
