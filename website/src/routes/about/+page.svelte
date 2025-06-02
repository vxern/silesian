<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
</script>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.about.title"]()} />
  </Page.Header>
</Page.Root>
