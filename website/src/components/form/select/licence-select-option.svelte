<script>
  import SelectOption from "./select-option.svelte";
  import LicenceLabel from "../../labels/licence-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <LicenceLabel licence={option[1]} />
</SelectOption>
