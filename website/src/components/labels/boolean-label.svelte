<script>
  import { m } from "$lib/paraglide/messages";
  import Label from "./label.svelte";

  const { value } = $props();
</script>

{#if value}
  <Label class="bg-green-500">
    {m["meta.yes"]()}
  </Label>
{:else}
  <Label class="bg-red-500">
    {m["meta.no"]()}
  </Label>
{/if}
