<script>
  import SelectOption from "./select-option.svelte";
  import AccessLabel from "../../labels/access-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <AccessLabel access={option[1]} />
</SelectOption>
