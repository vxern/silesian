<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import Form from "../../../components/form/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
  import constants from "$lib/constants/core";
  import sources_ from "$lib/constants/sources";
  import { compareName, compareAuthors } from "../../../helpers/sources.js";
  import Button from "../../../components/interactions/button.svelte";
  import {
    licencesEnum,
    orthographiesEnum,
    languagesEnum,
  } from "$lib/database/schema";
  import "tippy.js/themes/material.css";

  // TODO(vxern): Get some of this stuff dynamically.

  const sources = Object.fromEntries(
    Object.entries(sources_)
      .sort(
        ([, a], [_, b]) =>
          compareName(a.name, b.name) || compareAuthors(a.authors, b.authors)
      )
      .reverse()
  );
  const categories = ["Opole"];

  // TODO(vxern): Pick the example at random from the database.
  // TODO(vxern): Extract the defaults into the constants.
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.entries.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root view="wide">
  <Page.Header>
    <Page.Title title={m["routes.entries.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <form method="POST" action="?/create" class="flex flex-col gap-y-6">
      <section class="flex gap-x-4">
        <Form.TextElement
          name="lemma"
          label={m["routes.entries.new.form.lemma"]()}
          description={m["routes.entries.new.form.lemma_description"]()}
        />
        <Form.SelectElement
          name="source"
          label={m["routes.entries.new.form.source"]()}
          description={m["routes.entries.new.form.source_description"]()}
          formatOption={([_, source]) => source.name}
          options={() => Object.entries(sources)}
          component={Form.SourceSelectOption}
        />
        <Form.SelectElement
          name="licence"
          label={m["routes.entries.new.form.licence"]()}
          description={m["routes.entries.new.form.licence_description"]()}
          formatOption={(licence) => m[`licences.${licence}`]?.() ?? licence}
          options={() => licencesEnum.enumValues}
          component={Form.SimpleSelectOption}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.SelectElement
          name="orthography"
          label={m["routes.entries.new.form.orthography"]()}
          description={m["routes.entries.new.form.orthography_description"]()}
          formatOption={(orthography) =>
            m[`orthographies.${orthography}`]() ?? orthography}
          options={() => orthographiesEnum.enumValues}
          component={Form.SimpleSelectOption}
        />
        <Form.SelectElement
          name="source_language"
          label={m["routes.entries.new.form.source_language"]()}
          description={m[
            "routes.entries.new.form.source_language_description"
          ]()}
          formatOption={(language) => m[`languages.${language}`]()}
          options={() => languagesEnum.enumValues}
          component={Form.SimpleSelectOption}
        />
        <Form.SelectElement
          name="target_language"
          label={m["routes.entries.new.form.target_language"]()}
          description={m[
            "routes.entries.new.form.target_language_description"
          ]()}
          formatOption={(language) => m[`languages.${language}`]()}
          options={() => languagesEnum.enumValues}
          component={Form.SimpleSelectOption}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.SelectElement
          name="categories"
          label={m["routes.entries.new.form.categories"]()}
          description={m["routes.entries.new.form.categories_description"]()}
          options={() => categories}
          component={Form.SimpleSelectOption}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.MarkdownElement
          name="contents"
          label={m["routes.entries.new.form.contents"]()}
          description={m["routes.entries.new.form.contents_description"]()}
          previewMessage={m["routes.entries.new.form.preview_message"]()}
        />
      </section>
      <section class="flex gap-x-4">
        <Button type="submit" icon={AddLineIcon} colour="green">
          {m["routes.entries.new.form.save"]()}
        </Button>
        <Button name="draft" type="submit" icon={Save2LineIcon} colour="zinc">
          {m["routes.entries.new.form.save_as_draft"]()}
        </Button>
      </section>
    </form>
  </Page.Contents>
</Page.Root>
