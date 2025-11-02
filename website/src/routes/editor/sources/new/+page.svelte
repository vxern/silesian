<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../../components/page/index.js";
  import Form from "../../../../components/form/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import constants from "$lib/constants/core";
  import sources from "$lib/constants/sources";
  import Button from "../../../../components/interactions/button.svelte";
  import "tippy.js/themes/material.css";

  const licences = [
    ...new Set(
      Object.values(sources)
        .map((source) => source.licence)
        .filter((e) => e)
    ),
  ];
  const accesses = [
    ...new Set(
      Object.values(sources)
        .map((source) => source.access)
        .filter((e) => e)
    ),
  ];
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.editor.sources.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.editor.sources.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root view="wide">
  <Page.Header>
    <Page.Title title={m["routes.editor.sources.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <form method="POST" action="?/create" class="flex flex-col gap-y-6">
      <section class="flex gap-x-4">
        <Form.TextElement
          name="name"
          label={m["routes.editor.sources.new.form.name"]()}
          description={m["routes.editor.sources.new.form.name_description"]()}
        />
        <Form.TextElement
          name="link"
          label={m["routes.editor.sources.new.form.link"]()}
          description={m["routes.editor.sources.new.form.link_description"]()}
        />
        <Form.TextElement
          name="isbn"
          label={m["routes.editor.sources.new.form.isbn"]()}
          description={m["routes.editor.sources.new.form.isbn_description"]()}
        />
        <Form.TextElement
          name="authors"
          label={m["routes.editor.sources.new.form.authors"]()}
          description={m[
            "routes.editor.sources.new.form.authors_description"
          ]()}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.SelectElement
          name="licence_id"
          label={m["routes.editor.sources.new.form.licence_id"]()}
          description={m[
            "routes.editor.sources.new.form.licence_id_description"
          ]()}
          formatOption={(licence) => m[`licences.${licence}`]?.() ?? licence}
          options={() => licences}
          component={Form.SimpleSelectOption}
        />
        <Form.SelectElement
          name="access"
          label={m["routes.editor.sources.new.form.access"]()}
          description={m["routes.editor.sources.new.form.access_description"]()}
          formatOption={(access) => m[`accesses.${access}`]()}
          options={() => accesses}
          component={Form.SimpleSelectOption}
        />
        <Form.TextElement
          name="redistributable"
          label={m["routes.editor.sources.new.form.redistributable"]()}
          description={m[
            "routes.editor.sources.new.form.redistributable_description"
          ]()}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.TextElement
          name="total_count"
          label={m["routes.editor.sources.new.form.total_count"]()}
          description={m[
            "routes.editor.sources.new.form.total_count_description"
          ]()}
        />
        <section class="flex-1"></section>
        <section class="flex-1"></section>
      </section>
      <section class="flex gap-x-4 items-start">
        <Button type="submit" icon={AddLineIcon} colour="green">
          {m["routes.editor.entries.new.form.add"]()}
        </Button>
      </section>
    </form>
  </Page.Contents>
</Page.Root>
