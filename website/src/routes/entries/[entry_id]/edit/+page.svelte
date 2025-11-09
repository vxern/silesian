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
  // TODO(vxern): Use load functions.

  let entry = $state();
  async function fetchEntry() {
    const response = await fetch(`/api/entries/${page.params.entry_id}`);
    entry = await response.json();
  }

  onMount(() => {
    fetchEntry();
  });
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
        entry_lemma: entry?.lemma,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.entries.[entry_id].edit.title"]({
        entry_lemma: entry?.lemma,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if entry}
      <form
        method="POST"
        action="?/update"
        use:enhance
        class="flex flex-col gap-y-6"
      >
        <input type="hidden" name="id" value={entry.id} />
        <EntryForm {entry} />
      </form>
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
