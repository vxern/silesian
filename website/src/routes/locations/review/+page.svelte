<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import LocationTable from "../../../components/locations/location-table.svelte";
  import constants from "$lib/constants/core";
  import BackButton from "../../../components/interactions/back-button.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.locations.review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.locations.review.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.locations.review.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/locations")} />
    </Page.Actions>
    <LocationTable
      locations={data.locations}
      mode="review"
      noneText={m["routes.locations.review.none"]()}
    />
  </Page.Contents>
</Page.Root>
