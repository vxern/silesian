<script>
  import { goto } from "$app/navigation";

  const { source, link = false } = $props();
</script>

{#snippet label()}
  <section
    class="flex rounded-lg p-2 font-medium text-sm text-white bg-zinc-700"
  >
    <section class="basis-3/5 text-start">
      {source.name}
    </section>
    <section class="basis-2/5 text-end">
      {source.authors.join(", ")}
    </section>
  </section>
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
