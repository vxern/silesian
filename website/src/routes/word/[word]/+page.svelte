<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import { onMount } from "svelte";
  import { renderMarkdown } from "../../../helpers/markdown.js";
  import SearchBar from "../../../components/search/search-bar.svelte";
  import { getSource } from "../../../helpers/sources.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import Loading from "../../../components/meta/loading.svelte";

  let definitions = $state();
  async function fetchDefinitions() {
    const response = await fetch(`/api/word/${encodeURIComponent("jako")}`);
    const entries = await response.json();

    definitions = entries;
  }

  onMount(() => {
    fetchDefinitions();
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.word.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.word.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

{#if definitions}
  <Page.Root>
    <Page.Header>
      <SearchBar />
    </Page.Header>
    <Page.Divider />
    <Page.Contents>
      <section class="flex gap-y-8 flex-col">
        {#each definitions as definition}
          {@const source = getSource(definition.source)}
          <article class="flex-1 flex flex-col w-full gap-y-2 text-start">
            <article>
              {@html renderMarkdown(definition.contents)}
            </article>
            <article class="flex items-end flex-col">
              <section>
                <span class="text-zinc-600">{m["routes.word.source"]()}</span>
                <a
                  class="rounded-md text-blue-500 text-end underline"
                  href={source.link}
                >
                  {source.name}
                </a>
              </section>
              <section>
                <span class="text-zinc-600">{m["routes.word.authors"]()}</span>
                {source.authors.join(", ")}
              </section>
            </article>
          </article>
          <Page.Divider />
        {/each}
        <section>
          <span class="text-zinc-700">{m["meta.end"]()}</span>
        </section>
      </section>
    </Page.Contents>
  </Page.Root>
{:else}
  <Loading />
{/if}
