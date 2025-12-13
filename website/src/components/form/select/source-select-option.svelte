<script>
  import SelectOption from "./select-option.svelte";
  import SourceLabel from "../../labels/source-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <SourceLabel source={option[1]} />
</SelectOption>
