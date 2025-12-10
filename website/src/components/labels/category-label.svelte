<script>
  import Label from "./label.svelte";
  import { goto } from "$app/navigation";
  import { resolveTailwindColour } from "../../helpers/tailwind";
  import Palette2LineIcon from "~icons/mingcute/box-2-line";

  const { category, link = false } = $props();
</script>

{#snippet label()}
  <Label class={resolveTailwindColour(category.colour)} icon={Palette2LineIcon}>
    {category.name}
  </Label>
{/snippet}

{#if link}
  <!-- TODO(vxern): Is this the right link? -->
  <button
    class="w-full cursor-pointer"
    onclick={() => goto(`/categories/${category.id}/review`)}
  >
    {@render label()}
  </button>
{:else}
  {@render label()}
{/if}
