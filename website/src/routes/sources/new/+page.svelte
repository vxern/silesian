<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import { enhance } from "$app/forms";
  import SourceForm from "../form.svelte";
  import "tippy.js/themes/material.css";
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.sources.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root view="wide">
  <Page.Header>
    <Page.Title title={m["routes.sources.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <form
      method="POST"
      action="?/create"
      use:enhance
      class="flex flex-col gap-y-6"
    >
      <SourceForm />
    </form>
  </Page.Contents>
</Page.Root>
