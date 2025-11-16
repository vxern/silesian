<script>
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { enhance } from "$app/forms";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Loading from "../../../../components/meta/loading.svelte";
  import EntryForm from "../../form.svelte";
  import constants from "$lib/constants/core";

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
    <form
      method="POST"
      action="?/update"
      use:enhance
      class="flex flex-col gap-y-6"
    >
      <input type="hidden" name="id" value={data.entry.id} />
      <EntryForm entry={data.entry} />
    </form>
  </Page.Contents>
</Page.Root>
