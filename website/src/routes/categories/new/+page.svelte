<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import CategoryForm from "../form.svelte";
  import BackButton from "../../../components/interactions/back-button.svelte";
  import { goto } from "$app/navigation";
  import "tippy.js/themes/material.css";
  import Form from "../../../components/form/index.js";

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.categories.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.categories.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.categories.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/categories")} />
    </Page.Actions>
    <Form.Root method="POST" action="?/create" class="flex flex-col gap-y-6">
      <CategoryForm />
    </Form.Root>
  </Page.Contents>
</Page.Root>
