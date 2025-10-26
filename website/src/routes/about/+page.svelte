<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.about.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.about.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.about.title"]()} />
  </Page.Header>
  <Page.Divider />
  <section class="flex gap-x-4">
    <article class="flex-1 flex flex-col gap-y-1">
      <span class="text-blue-500 font-bold text-xl">
        {m["routes.about.sections.what.title"]({
          project_name: constants.project.name,
        })}
      </span>
      {m["routes.about.sections.what.description"]({
        project_name: constants.project.name,
      })}
    </article>
    <article class="flex-1 flex flex-col gap-y-1">
      <span class="text-blue-500 font-bold text-xl">
        {m["routes.about.sections.when.title"]({
          project_name: constants.project.name,
        })}
      </span>
      {m["routes.about.sections.when.description"]({
        project_name: constants.project.name,
      })}
    </article>
    <article class="flex-1 flex flex-col gap-y-1">
      <span class="text-blue-500 font-bold text-xl">
        {m["routes.about.sections.why.title"]({
          project_name: constants.project.name,
        })}
      </span>
      {m["routes.about.sections.why.description"]({
        project_name: constants.project.name,
      })}
    </article>
  </section>
</Page.Root>
