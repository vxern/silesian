<script>
  import SelectOption from "./select-option.svelte";
  import SourceLabel from "../../labels/source-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption highlighted={selected} select={() => select(option)}>
  <SourceLabel source={option[0]} />
</SelectOption>
