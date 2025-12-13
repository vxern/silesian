<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import AuthorForm from "../../form.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import constants from "$lib/constants/core";
  import Form from "../../../../components/form/index.js";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.authors.[author_id].edit.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.authors.[author_id].edit.title"]({
        author_name: data.author.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.authors.[author_id].edit.title"]({
        author_name: data.author.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/authors/drafts")} />
    </Page.Actions>
    <Form.Root method="POST" action="?/update" class="flex flex-col gap-y-6">
      <input type="hidden" name="id" value={data.author.id} />
      <AuthorForm author={data.author} />
    </Form.Root>
  </Page.Contents>
</Page.Root>
