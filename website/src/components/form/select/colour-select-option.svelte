<script>
  import ColourLabel from "../../labels/colour-label.svelte";

  const { option, select } = $props();
</script>

<button type="button" onclick={() => select(option)} class="cursor-pointer">
  <ColourLabel colour={option[1]} />
</button>
