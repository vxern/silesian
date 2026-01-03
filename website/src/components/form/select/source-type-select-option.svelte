<script>
  import SelectOption from "./select-option.svelte";
  import SourceTypeLabel from "../../labels/source-type-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <SourceTypeLabel type={option.object} />
</SelectOption>
