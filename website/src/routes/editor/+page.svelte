<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import Button from "../../components/interactions/button.svelte";
  import constants from "$lib/constants/core";
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.editor.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.editor.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.editor.title"]()} />
  </Page.Header>
  <Page.Divider />
  <section class="flex gap-x-4">
    <Button colour="green" onclick={() => goto("/editor/entries/new")}>
      {m["routes.editor.entries.new.title"]()}
    </Button>
    <Button colour="green" onclick={() => goto("/editor/sources/new")}>
      {m["routes.editor.sources.new.title"]()}
    </Button>
  </section>
</Page.Root>
