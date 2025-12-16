<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import EntryForm from "../../form.svelte";
  import constants from "$lib/constants/core";
  import Form from "../../../../components/form/index.js";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.entries.[entry_id].edit.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.[entry_id].edit.title"]({
        entry_lemma: data.entry.lemma,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.entries.[entry_id].edit.title"]({
        entry_lemma: data.entry.lemma,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto(`/entries/drafts#${data.entry.id}`)} />
    </Page.Actions>
    <Form.Root method="POST" action="?/update" class="flex flex-col gap-y-6">
      <input type="hidden" name="id" value={data.entry.id} />
      <EntryForm entry={data.entry} />
    </Form.Root>
  </Page.Contents>
</Page.Root>
