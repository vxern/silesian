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
    content={m["routes.sources.[source_id].history.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.[source_id].history.title"]({
        source_name: data.source.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.sources.[source_id].history.title"]({
        source_name: data.source.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      {#if data.source.status === "published"}
        <BackButton onclick={() => goto(`/sources#${data.source.id}`)} />
      {:else if data.source.status === "pending"}
        <BackButton
          onclick={() => goto(`/sources/pending#${data.source.id}`)}
        />
      {:else if data.source.status === "draft"}
        <BackButton onclick={() => goto(`/sources/drafts#${data.source.id}`)} />
      {/if}
    </Page.Actions>
    <VersionTable
      object={data.source}
      versions={data.versions}
      types={{
        licence: "licence",
        orthography: "orthography",
        source_language: "language",
        target_language: "language",
        access: "access",
      }}
      translateProperty={(property) => m[`routes.sources.form.${property}`]()}
    />
  </Page.Contents>
</Page.Root>
