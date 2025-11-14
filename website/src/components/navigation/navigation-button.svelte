<script>
  import { clsx } from "clsx/lite";
  import CornerDownLeftLineIcon from "~icons/mingcute/corner-down-left-line";

  const { children, highlighted, onclick, icon: Icon, depth = 0 } = $props();
</script>

{#snippet button()}
  <button
    class={clsx(
      "flex gap-x-2 items-center text-xl",
      highlighted ? "text-yellow-400" : "text-zinc-400",
      onclick &&
        (highlighted ? "hover:text-yellow-300" : "hover:text-zinc-300"),
      onclick && "cursor-pointer"
    )}
    {onclick}
  >
    {@render children?.()}
    <Icon />
  </button>
{/snippet}

{#if depth > 0}
  <section class="flex gap-x-2 items-center">
    {@render button()}
    <CornerDownLeftLineIcon class="text-xl text-zinc-400" />
  </section>
{:else}
  {@render button()}
{/if}
