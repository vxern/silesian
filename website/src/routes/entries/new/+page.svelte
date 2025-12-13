<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import { goto } from "$app/navigation";
  import constants from "$lib/constants/core";
  import BackButton from "../../../components/interactions/back-button.svelte";
  import EntryForm from "../form.svelte";
  import Form from "../../../components/form/index.js";

  // TODO(vxern): Pick the example at random from the database.
  // TODO(vxern): Extract the defaults into the constants.

  let entry = $state();
  async function onSubmit({ result, update }) {
    if (result.type === "success") {
      entry = { source_id: result.data.source_id };
      await update({ invalidateAll: true });
    }
  }
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
      <BackButton onclick={() => goto("/entries")} />
    </Page.Actions>
    <Form.Root
      method="POST"
      action="?/create"
      enhance={() => onSubmit}
      class="flex flex-col gap-y-6"
    >
      <EntryForm {entry} />
    </Form.Root>
  </Page.Contents>
</Page.Root>
