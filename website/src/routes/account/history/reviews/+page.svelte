<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import constants from "$lib/constants/core";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Page from "../../../../components/page/index.js";
  import ReviewTables from "../../../../components/reviews/review-tables.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.account.history.reviews.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.history.reviews.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.history.reviews.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/account/statistics")} />
    </Page.Actions>
    <ReviewTables
      reviewCount={data.reviewCount}
      reviewCountByMonth={data.reviewCountByMonth}
      reviewHistory={data.reviewHistory}
    />
  </Page.Contents>
</Page.Root>
