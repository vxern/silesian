<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
</script>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.about.title"]()} />
  </Page.Header>
</Page.Root>
