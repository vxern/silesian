<script>
  import SelectOption from "./select-option.svelte";
  import ColourLabel from "../../labels/colour-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <ColourLabel colour={option[1]} />
</SelectOption>
