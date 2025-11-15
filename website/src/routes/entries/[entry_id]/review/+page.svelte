<script>
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Form from "../../../../components/form/index.js";
  import Loading from "../../../../components/meta/loading.svelte";
  import EntryForm from "../../form.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import Button from "../../../../components/interactions/button.svelte";
  import CheckLineIcon from "~icons/mingcute/check-line";
  import CloseLineIcon from "~icons/mingcute/close-line";
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
    content={m["routes.entries.[entry_id].review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.[entry_id].review.title"]({
        entry_lemma: entry?.lemma,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.entries.[entry_id].review.title"]({
        entry_lemma: entry?.lemma,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => window.history.back()} />
    </Page.Actions>
    {#if entry}
      <section>
        <Form.Disabled>
          <EntryForm {entry} />
        </Form.Disabled>
        <Page.Actions>
          <Button
            icon={CheckLineIcon}
            onclick={() => window.history.back()}
            colour="green"
          >
            {m["components.form.accept"]()}
          </Button>
          <Button
            icon={CloseLineIcon}
            onclick={() => window.history.back()}
            colour="red"
          >
            {m["components.form.reject"]()}
          </Button>
        </Page.Actions>
      </section>
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
