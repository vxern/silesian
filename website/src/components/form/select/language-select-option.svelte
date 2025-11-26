<script>
  import SelectOption from "./select-option.svelte";
  import LanguageLabel from "../../labels/language-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <LanguageLabel locale={option[1]} />
</SelectOption>
