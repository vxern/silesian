<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import VersionTable from "../../../../components/versions/version-table.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import constants from "$lib/constants/core";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.locations.[location_id].history.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.locations.[location_id].history.title"]({
        location_name: data.location.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.locations.[location_id].history.title"]({
        location_name: data.location.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      {#if data.location.status === "published"}
        <BackButton onclick={() => goto(`/locations#${data.location.id}`)} />
      {:else if data.location.status === "pending"}
        <BackButton
          onclick={() => goto(`/locations/pending#${data.location.id}`)}
        />
      {:else if data.location.status === "draft"}
        <BackButton
          onclick={() => goto(`/locations/drafts#${data.location.id}`)}
        />
      {/if}
    </Page.Actions>
    <VersionTable
      object={data.location}
      versions={data.versions}
      types={{
        country: "country",
      }}
      translateProperty={(property) => m[`routes.locations.form.${property}`]()}
    />
  </Page.Contents>
</Page.Root>
