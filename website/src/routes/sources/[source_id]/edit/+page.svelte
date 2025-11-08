<script>
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { enhance } from "$app/forms";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Loading from "../../../../components/meta/loading.svelte";
  import SourceForm from "../../form.svelte";
  import constants from "$lib/constants/core";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.
  // TODO(vxern): Use load functions.

  let source = $state();
  async function fetchSource() {
    const response = await fetch(`/api/sources/${page.params.source_id}`);
    source = await response.json();
  }

  onMount(() => {
    fetchSource();
  });
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.sources.[source_id].edit.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.[source_id].edit.title"]({
        source_name: source?.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root view="wide">
  <Page.Header>
    <Page.Title
      title={m["routes.sources.[source_id].edit.title"]({
        source_name: source?.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if source}
      <form
        method="POST"
        action="?/update"
        use:enhance
        class="flex flex-col gap-y-6"
      >
        <input type="hidden" name="id" value={source.id} />
        <SourceForm {source} />
      </form>
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
