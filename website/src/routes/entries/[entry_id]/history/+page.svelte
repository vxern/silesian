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
    content={m["routes.entries.[entry_id].history.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.[entry_id].history.title"]({
        entry_lemma: data.entry.lemma,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.entries.[entry_id].history.title"]({
        entry_lemma: data.entry.lemma,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      {#if data.entry.status === "published"}
        <BackButton onclick={() => goto(`/entries#${data.entry.id}`)} />
      {:else if data.entry.status === "pending"}
        <BackButton onclick={() => goto(`/entries/pending#${data.entry.id}`)} />
      {/if}
    </Page.Actions>
    <VersionTable
      object={data.entry}
      versions={data.versions}
      types={{
        country: "country",
      }}
      translateProperty={(property) => m[`routes.entries.form.${property}`]()}
    />
  </Page.Contents>
</Page.Root>
