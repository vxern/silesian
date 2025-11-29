<script>
  import { clsx } from "clsx/lite";
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import { renderMarkdown } from "../../../helpers/markdown.js";
  import SearchBar from "../../../components/search/search-bar.svelte";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";
  import { page } from "$app/stores";

  const { data } = $props();
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

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.lemma.title"]()} />
    <SearchBar />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <section class="flex flex-col gap-y-8">
      {#each data.entries as entry}
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
              {entry.source.authors
                .map((author) => author.author)
                .map((author) => author.name)
                .join(", ")}
            </section>
          </article>
        </section>
      {/each}
      {#if data.entries.length > 0}
        <section>
          <span class="text-zinc-700">
            {m["routes.lemma.end_of_results"]()}
          </span>
        </section>
      {:else}
        <section class="flex flex-col">
          <span class="text-xl">{m["routes.lemma.no_results"]()}</span>
          <span class="text-xs text-zinc-400">
            {m["routes.lemma.may_not_be_imported"]()}
          </span>
        </section>
      {/if}
    </section>
  </Page.Contents>
</Page.Root>
