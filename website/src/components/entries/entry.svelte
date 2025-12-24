<script>
  import { clsx } from "clsx/lite";
  import { renderMarkdown } from "../../helpers/markdown.js";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import tippy from "tippy.js";
  import Button from "../interactions/button.svelte";
  import "tippy.js/themes/material.css";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import AlertLineIcon from "~icons/mingcute/alert-line";
  import BookmarkLineIcon from "~icons/mingcute/bookmark-line";
  import BookmarkFillIcon from "~icons/mingcute/bookmark-fill";
  import CategoryLabel from "../labels/category-label.svelte";

  // TODO(vxern): Get rid of this hardcoding.
  const hasPermission = true;

  const { entry, highlighted = false } = $props();

  let unverifiedWordIconElement;
  let unverifiedWordTooltip;

  if (entry.status !== "published") {
    $effect(() => {
      unverifiedWordTooltip = tippy(unverifiedWordIconElement, {
        content: m["routes.lemma.unverified"](),
        trigger: "mouseenter focus",
        placement: "top-start",
        theme: "error",
      });
    });
  }
</script>

{#snippet article()}
  <article
    id={entry.id}
    class={clsx(
      "relative flex-1 flex flex-col w-full gap-y-2 text-start p-4 rounded-lg bg-zinc-900 outline-1",
      highlighted ? "outline-yellow-500" : "outline-zinc-600"
    )}
  >
    {#if entry.status !== "published"}
      <section
        class="absolute top-4 right-4"
        bind:this={unverifiedWordIconElement}
      >
        <AlertLineIcon class="text-red-400 text-xl" />
      </section>
    {/if}
    <section>
      {@html renderMarkdown(entry.contents)}
    </section>
    <section class="flex items-end justify-between">
      <section class="flex flex-col">
        <section>
          <span class="text-zinc-600">{m["routes.lemma.source"]()}</span>
          <a class="text-blue-500 underline" href={entry.source.link}>
            {entry.source.name}
          </a>
        </section>
        <section>
          <span class="text-zinc-600">{m["routes.lemma.orthography"]()}</span>
          {m[`orthographies.${entry.source.orthography}`]()}
        </section>
        {#if entry.source.authors.length > 0}
          <section>
            <span class="text-zinc-600">
              {m["routes.lemma.authors"]()}
            </span>
            {entry.source.authors.map((author) => author.name).join(", ")}
          </section>
        {/if}
        <!-- TODO(vxern): Re-enable. -->
        <!-- {#if entry.source.locations.length > 0}
                <section>
                  <span class="text-zinc-600">
                    {m["routes.lemma.location"]()}
                  </span>
                  {#each entry.source.locations as location}
                    <span class="text-blue-500">{location}</span>
                  {/each}
                </section>
              {/if} -->
      </section>
      <section class="flex gap-x-1">
        {#each entry.categories as category}
          <CategoryLabel {category} />
        {/each}
      </section>
    </section>
  </article>
{/snippet}

<section class="relative flex">
  {@render article()}
  <section class="relative">
    <section class="absolute left-2 flex flex-col gap-y-2">
      {#if hasPermission}
        <Button
          colour="green"
          icon={Pencil2LineIcon}
          tooltipMessage={m["components.interactions.button.edit"]()}
          tooltipTheme="edit"
          onclick={() => goto(`/entries/${entry.id}/edit`)}
        />
      {:else}
        {@render article()}
      {/if}
      <!-- TODO(vxern): Wrap in a form. -->
      <form method="POST" action="?/bookmark" class="flex flex-col gap-y-6">
        <input type="hidden" name="id" value={entry.id} />
        <Button
          colour="zinc"
          type="submit"
          icon={entry.bookmarks.at(0) ? BookmarkFillIcon : BookmarkLineIcon}
          tooltipMessage={m["components.interactions.button.bookmark"]()}
          tooltipTheme="zinc"
        />
      </form>
    </section>
  </section>
</section>
