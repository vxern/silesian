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
    content={m["routes.categories.[category_id].history.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.categories.[category_id].history.title"]({
        category_name: data.category.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.categories.[category_id].history.title"]({
        category_name: data.category.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      {#if data.category.status === "published"}
        <BackButton onclick={() => goto(`/categories#${data.category.id}`)} />
      {:else if data.category.status === "pending"}
        <BackButton
          onclick={() => goto(`/categories/pending#${data.category.id}`)}
        />
      {:else if data.category.status === "draft"}
        <BackButton
          onclick={() => goto(`/categories/drafts#${data.category.id}`)}
        />
      {/if}
    </Page.Actions>
    <VersionTable
      object={data.category}
      versions={data.versions}
      types={{
        colour: "colour",
      }}
      translateProperty={(property) =>
        m[`routes.categories.form.${property}`]()}
    />
  </Page.Contents>
</Page.Root>
