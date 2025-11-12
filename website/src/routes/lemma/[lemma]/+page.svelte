<script>
  import { clsx } from "clsx/lite";
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import { onMount } from "svelte";
  import { renderMarkdown } from "../../../helpers/markdown.js";
  import SearchBar from "../../../components/search/search-bar.svelte";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import Loading from "../../../components/meta/loading.svelte";
  import { page } from "$app/stores";

  let entries = $state();
  async function fetchEntries() {
    const response = await fetch(
      `/api/lemma/${encodeURIComponent($page.params.lemma)}`
    );
    entries = await response.json();
  }

  onMount(() => {
    fetchEntries();
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.lemma.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.lemma.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

{#if entries}
  <Page.Root>
    <Page.Header>
      <Page.Title title={m["routes.lemma.title"]()} />
      <SearchBar />
    </Page.Header>
    <Page.Divider />
    <Page.Contents>
      <section class="flex flex-col gap-y-8">
        {#each entries as entry}
          <section
            id={entry.id}
            class={clsx(
              "flex-1 flex flex-col w-full gap-y-2 text-start p-4 rounded-lg bg-zinc-900 outline-1",
              $page.url.hash === `#${entry.id}`
                ? "outline-yellow-500"
                : "outline-zinc-600"
            )}
          >
            <article>
              {@html renderMarkdown(entry.contents)}
            </article>
            <article class="flex items-end flex-col">
              <section>
                <span class="text-zinc-600">{m["routes.lemma.source"]()}</span>
                <a
                  class="rounded-md text-blue-500 text-end underline"
                  href={entry.source.link}
                >
                  {entry.source.name}
                </a>
              </section>
              <section>
                <span class="text-zinc-600">{m["routes.lemma.authors"]()}</span>
                {entry.source.authors.join(", ")}
              </section>
            </article>
          </section>
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
