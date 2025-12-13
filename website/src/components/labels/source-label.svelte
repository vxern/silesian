<script>
  import Label from "./label.svelte";
  import { goto } from "$app/navigation";
  import Box2LineIcon from "~icons/mingcute/box-2-line";

  const { source, link = false } = $props();
</script>

{#snippet label()}
  <Label class="bg-zinc-700" icon={Box2LineIcon}>
    {#if source.authors.length > 0}
      <section class="basis-3/5 text-start">
        {source.name}
      </section>
      <section class="basis-2/5 text-end">
        {source.authors
          .map((author) => author.author)
          .map((author) => author.name)
          .join(", ")}
      </section>
    {:else}
      <section class="text-start">
        {source.name}
      </section>
    {/if}
  </Label>
{/snippet}

{#if link}
  <!-- TODO(vxern): Is this the right link? -->
  <button
    class="w-full cursor-pointer"
    onclick={() => goto(`/sources/${source.id}/review`)}
  >
    {@render label()}
  </button>
{:else}
  {@render label()}
{/if}
