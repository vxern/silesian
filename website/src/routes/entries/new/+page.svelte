<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import { goto } from "$app/navigation";
  import constants from "$lib/constants/core";
  import BackButton from "../../../components/interactions/back-button.svelte";
  import EntryForm from "../form.svelte";

  // TODO(vxern): Pick the example at random from the database.
  // TODO(vxern): Extract the defaults into the constants.
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.entries.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.entries.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/sources")} />
    </Page.Actions>
    <form method="POST" action="?/create" class="flex flex-col gap-y-6">
      <EntryForm />
    </form>
  </Page.Contents>
</Page.Root>
