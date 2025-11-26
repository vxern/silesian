<script>
  import SelectOption from "./select-option.svelte";
  import OrthographyLabel from "../../labels/orthography-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <OrthographyLabel orthography={option[1]} />
</SelectOption>
