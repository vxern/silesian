<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import LocationForm from "../../form.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import constants from "$lib/constants/core";
  import Form from "../../../../components/form/index.js";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.locations.[location_id].edit.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.locations.[location_id].edit.title"]({
        location_name: data.location.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.locations.[location_id].edit.title"]({
        location_name: data.location.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/locations/drafts")} />
    </Page.Actions>
    <Form.Root method="POST" action="?/update" class="flex flex-col gap-y-6">
      <input type="hidden" name="id" value={data.location.id} />
      <LocationForm location={data.location} />
    </Form.Root>
  </Page.Contents>
</Page.Root>
