<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import Form from "../../../components/form/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import constants from "$lib/constants/core";
  import sources_ from "$lib/constants/sources";
  import { compareName, compareAuthors } from "../../../helpers/sources.js";
  import "tippy.js/themes/material.css";
  import { renderMarkdown } from "../../../helpers/markdown.js";

  // TODO(vxern): Get some of this stuff dynamically.

  const sources = Object.fromEntries(
    Object.entries(sources_)
      .sort(
        ([, a], [_, b]) =>
          compareName(a.name, b.name) || compareAuthors(a.authors, b.authors)
      )
      .reverse()
  );
  const licences = [
    ...new Set(
      Object.values(sources)
        .map((source) => source.licence)
        .filter((e) => e)
    ),
  ];
  const orthographies = [
    ...new Set(
      Object.values(sources)
        .map((source) => source.orthography)
        .filter((e) => e)
    ),
  ];
  const sourceLanguages = [
    ...new Set(
      Object.values(sources)
        .map((source) => source.sourceLanguage)
        .filter((e) => e)
    ),
  ];
  const targetLanguages = [
    ...new Set(
      Object.values(sources)
        .map((source) => source.targetLanguage)
        .filter((e) => e)
    ),
  ];
  const categories = ["Opole"];

  // TODO(vxern): Pick the example at random from the database.
  // TODO(vxern): Extract the defaults into the constants.

  let contents = $state("");
  let renderedContents = $derived(renderMarkdown(contents));
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.editor.new.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.editor.new.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root padding="py-24 px-[15%]">
  <Page.Header>
    <Page.Title title={m["routes.editor.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <form method="POST" action="?/create" class="flex flex-col gap-y-6">
      <section class="flex gap-x-4">
        <Form.TextElement
          name="word"
          label={m["routes.editor.new.form.lemma"]()}
          placeholder={m["routes.editor.new.form.lemma_placeholder"]()}
        />
        <Form.SelectElement
          name="source"
          label={m["routes.editor.new.form.source"]()}
          placeholder={m["routes.editor.new.form.source_placeholder"]()}
          formatOption={([_, source]) => source.name}
          options={() => Object.entries(sources)}
          component={Form.SourceSelectOption}
        />
        <Form.SelectElement
          name="licence"
          label={m["routes.editor.new.form.licence"]()}
          placeholder={m["routes.editor.new.form.licence_placeholder"]()}
          formatOption={(licence) => m[`licences.${licence}`]?.() ?? licence}
          options={() => licences}
          component={Form.SimpleSelectOption}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.SelectElement
          name="orthography"
          label={m["routes.editor.new.form.orthography"]()}
          placeholder={m["routes.editor.new.form.orthography_placeholder"]()}
          formatOption={(orthography) =>
            m[`orthographies.${orthography}`]() ?? orthography}
          options={() => orthographies}
          component={Form.SimpleSelectOption}
        />
        <Form.SelectElement
          name="source_language"
          label={m["routes.editor.new.form.source_language"]()}
          placeholder={m[
            "routes.editor.new.form.source_language_placeholder"
          ]()}
          formatOption={(language) => m[`languages.${language}`]()}
          options={() => sourceLanguages}
          component={Form.SimpleSelectOption}
        />
        <Form.SelectElement
          name="target_language"
          label={m["routes.editor.new.form.target_language"]()}
          placeholder={m[
            "routes.editor.new.form.target_language_placeholder"
          ]()}
          formatOption={(language) => m[`languages.${language}`]()}
          options={() => targetLanguages}
          component={Form.SimpleSelectOption}
        />
      </section>
      <section class="flex gap-x-4">
        <Form.SelectElement
          name="categories"
          label={m["routes.editor.new.form.categories"]()}
          placeholder={m["routes.editor.new.form.categories_placeholder"]()}
          options={() => categories}
          component={Form.SimpleSelectOption}
        />
      </section>
      <section class="flex flex-col gap-y-1">
        <section class="flex flex-1">
          <label
            for="contents"
            class="flex-1 text-xl pl-1 text-start text-blue-500"
          >
            {m["routes.editor.new.form.contents"]()}
          </label>
        </section>
        <section class="flex flex-1">
          <textarea
            type="text"
            name="contents"
            placeholder={m["routes.editor.new.form.contents_placeholder"]()}
            rows="16"
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-4 rounded-l-lg text-sm font-mono h-160"
            bind:value={contents}
          ></textarea>
          <section
            class="flex-1 outline-1 bg-zinc-900 inset-shadow-[0_2px_10px_rgba(0,0,0,0.25)] inset-shadow-black outline-zinc-600 p-4 rounded-r-lg text-start h-160 overflow-y-auto"
          >
            {#if contents}
              {@html renderedContents}
            {:else}
              <span class="text-sm text-zinc-600">
                {m["routes.editor.new.form.preview_placeholder"]()}
              </span>
            {/if}
          </section>
        </section>
      </section>
      <section class="flex gap-x-4 items-start">
        <button
          type="submit"
          class="cursor-pointer flex items-center gap-x-1 outline-1 outline-green-500 bg-green-700 hover:bg-green-600 text-green-300 hover:text-green-100 rounded-lg text-lg font-bold p-2"
        >
          <AddLineIcon />
          {m["routes.editor.new.form.submit"]()}
        </button>
      </section>
    </form>
  </Page.Contents>
</Page.Root>
