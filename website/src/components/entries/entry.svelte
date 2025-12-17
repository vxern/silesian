<script>
  import { clsx } from "clsx/lite";
  import { renderMarkdown } from "../../helpers/markdown.js";
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import CategoryLabel from "../labels/category-label.svelte";

  // TODO(vxern): Get rid of this hardcoding.
  const hasPermission = true;

  const { entry, highlighted = false } = $props();
</script>

{#snippet article()}
  <article
    id={entry.id}
    class={clsx(
      "flex-1 flex flex-col w-full gap-y-2 text-start p-4 rounded-lg bg-zinc-900 outline-1",
      highlighted ? "outline-yellow-500" : "outline-zinc-600"
    )}
  >
    <section>
      {@html renderMarkdown(entry.contents)}
    </section>
    <section class="flex items-end justify-between">
      <section class="flex flex-col">
        <section>
          <span class="text-zinc-600">{m["routes.lemma.source"]()}</span>
          <a
            class="rounded-md text-blue-500 text-end underline"
            href={entry.source.link}
          >
            {entry.source.name}
          </a>
        </section>
        {#if entry.source.authors.length > 0}
          <section>
            <span class="text-zinc-600">
              {m["routes.lemma.authors"]()}
            </span>
            {entry.source.authors.map((author) => author.name).join(", ")}
          </section>
        {/if}
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

{#if hasPermission}
  <section class="relative flex">
    {@render article()}
    <section class="relative">
      <section class="absolute left-4">
        <Button
          colour="green"
          icon={Pencil2LineIcon}
          onclick={() => goto(`/entries/${entry.id}/edit`)}
        />
      </section>
    </section>
  </section>
{:else}
  {@render article()}
{/if}
