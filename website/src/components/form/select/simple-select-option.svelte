<script>
  import SelectOption from "./select-option.svelte";
  import TextLabel from "../../labels/text-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <TextLabel text={option[1]} highlighted={selected} />
</SelectOption>
