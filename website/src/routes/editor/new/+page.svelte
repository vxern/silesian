<script>
  import { m } from "$lib/paraglide/messages";
  import {
    getExampleContents,
    isSource,
    getSource,
  } from "../../../helpers/sources.js";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import constants from "$lib/constants/core";
  import DownLineIcon from "~icons/mingcute/down-line";
  import sources from "$lib/constants/sources";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";
  import { renderMarkdown } from "../../../helpers/markdown.js";
  import { onMount, untrack } from "svelte";

  // TODO(vxern): Pick the example at random from the database.
  // TODO(vxern): Extract the defaults into the constants.

  let source = $state();
  let languagePrefilledWith = $state("");
  let language = $state("");
  let categoriesPrefilledWith = $state([]);
  let categories = $state([]);
  let contentsPrefilledWith = $state("");
  let contents = $state("");

  let renderedContents = $derived(renderMarkdown(contents));

  // $effect(prefillData);

  // function prefillData() {
  //   if (!isSource(source)) {
  //     return;
  //   }

  //   const exampleData = getExampleData(source);

  //   if (contents.length > 0 && contentsPrefilledWith !== contents) {
  //     return;
  //   }

  //   untrack(() => {
  //     contentsPrefilledWith = exampleDefinition;
  //     contents = exampleDefinition;
  //   });
  // }

  let sourceElement;
  let sourceDropdownElement;
  let sourceTooltip;

  onMount(async () => {
    sourceTooltip = tippy(sourceElement, {
      content: sourceDropdownElement,
      allowHTML: true,
      trigger: "mousedown",
      placement: "bottom-start",
      maxWidth: sourceElement.clientWidth,
      interactive: true,
    });
  });

  function selectSource(identifier) {
    source = identifier;
    sourceTooltip?.hide();
  }

  function isSourceSelected(identifier) {
    return identifier === source;
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

<Page.Root padding="py-24 px-[15%]">
  <section class="invisible">
    <section
      bind:this={sourceDropdownElement}
      class="flex flex-col gap-y-2 py-1.5"
    >
      {#each Object.entries(sources) as [identifier, source]}
        <button
          class="rounded-lg p-2 {isSourceSelected(identifier)
            ? 'bg-blue-600'
            : 'bg-zinc-700'} text-sm cursor-pointer"
          type="button"
          onclick={() => selectSource(identifier)}
        >
          <section class="flex">
            <section class="basis-3/5 text-start">
              {source.name}
            </section>
            <section class="basis-2/5 text-end">
              {source.authors.join(", ")}
            </section>
          </section>
        </button>
      {/each}
    </section>
  </section>
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
          <section
            class="flex-1 flex justify-between items-center bg-zinc-800 outline-1 outline-zinc-600 p-3 rounded-lg w-full cursor-pointer"
            bind:this={sourceElement}
          >
            <input
              type="hidden"
              name="source"
              class="w-full focus:outline-0"
              bind:value={source}
            />
            {#if source}
              {getSource(source).name}
            {:else}
              <span class="text-zinc-500">
                {m["routes.editor.new.form.source_placeholder"]()}
              </span>
            {/if}
            <DownLineIcon />
          </section>
        </section>
      </section>
      <section class="flex gap-x-4">
        <section class="flex-1 flex flex-col gap-y-1 items-start">
          <label for="categories" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.categories"]()}
          </label>
          <input
            type="text"
            name="categories"
            placeholder={m["routes.editor.new.form.categories_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
          />
        </section>
        <section class="flex-1 flex flex-col gap-y-1 items-start">
          <label for="licence" class="pl-1 text-xl text-blue-500">
            {m["routes.editor.new.form.licence"]()}
          </label>
          <input
            type="text"
            name="licence"
            placeholder={m["routes.editor.new.form.licence_placeholder"]()}
            class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
          />
        </section>
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
            onfocus={onFocusContents}
            onblur={onBlurContents}
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
