<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
</script>

<svelte:head>
  <title>silesian.eu — {m["routes.about.title"]()}</title>
</svelte:head>

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.about.title"]()} />
  </Page.Header>
</Page.Root>
