<script>
  import SelectOption from "./select-option.svelte";
  import CountryLabel from "../../labels/country-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <CountryLabel country={option[1]} />
</SelectOption>
