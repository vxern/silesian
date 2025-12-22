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
    content={m["routes.authors.[author_id].history.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.authors.[author_id].history.title"]({
        author_name: data.author.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.authors.[author_id].history.title"]({
        author_name: data.author.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      {#if data.author.status === "published"}
        <BackButton onclick={() => goto(`/authors#${data.author.id}`)} />
      {:else if data.author.status === "pending"}
        <BackButton
          onclick={() => goto(`/authors/pending#${data.author.id}`)}
        />
      {:else if data.author.status === "draft"}
        <BackButton onclick={() => goto(`/authors/drafts#${data.author.id}`)} />
      {/if}
    </Page.Actions>
    <VersionTable
      object={data.author}
      versions={data.versions}
      translateProperty={(property) => m[`routes.authors.form.${property}`]()}
    />
  </Page.Contents>
</Page.Root>
