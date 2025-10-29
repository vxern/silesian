<script>
  import { m } from "$lib/paraglide/messages";
  import { getExampleDefinition, isSource } from "../../../helpers/sources.js";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import constants from "$lib/constants/core";
  import { renderMarkdown } from "../../../helpers/markdown.js";

  // TODO(vxern): Pick the example at random from the database.
  // TODO(vxern): Extract the defaults into the constants.

  let source = $state();
  let contentsPrefilledWith = $state();
  let contents = $state("");

  let renderedContents = $derived(renderMarkdown(contents));

  $effect(prefillContentsWithExample);

  function prefillContentsWithExample() {
    if (isContentsFocused) {
      return;
    }

    if (!isSource(source)) {
      return;
    }

    const exampleDefinition = getExampleDefinition(source);
    if (!exampleDefinition) {
      return;
    }

    if (contents?.length > 0 && contentsPrefilledWith !== contents) {
      return;
    }

    contentsPrefilledWith = exampleDefinition;
    contents = exampleDefinition;
  }

  let isContentsFocused = false;

  function onFocus() {
    console.log("onFocus");
    isContentsFocused = true;
  }

  function onBlur() {
    console.log("onBlur");
    isContentsFocused = false;
  }
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

<Page.Root padding="py-24 px-[10%]">
  <Page.Header>
    <Page.Title title={m["routes.editor.new.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <form method="POST" action="?/create" class="flex flex-col gap-y-6">
      <section class="flex gap-x-4">
        <section class="flex-1 flex flex-col gap-y-1 items-start">
          <label for="word" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.lemma"]()}
          </label>
          <input
            type="text"
            name="word"
            placeholder={m["routes.editor.new.form.lemma_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
          />
        </section>
        <section class="flex-1 flex flex-col gap-y-1 items-start">
          <label for="source" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.source"]()}
          </label>
          <input
            type="text"
            name="source"
            placeholder={m["routes.editor.new.form.source_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
            bind:value={source}
          />
        </section>
      </section>
      <section class="flex flex-col gap-y-1">
        <section class="flex flex-1">
          <label for="contents" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.contents"]()}
          </label>
          <article class="flex-1"></article>
          <label for="placeholder" class="pr-1 text-xl text-blue-500">
            {m["routes.editor.new.form.preview"]()}
          </label>
        </section>
        <section class="flex flex-1">
          <textarea
            type="text"
            name="contents"
            placeholder={m["routes.editor.new.form.contents_placeholder"]()}
            rows="16"
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-4 rounded-l-lg text-sm font-mono h-160"
            onfocus={onFocus}
            onblur={onBlur}
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
