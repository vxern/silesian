<script>
  import SelectOption from "./select-option.svelte";
  import LocationLabel from "../../labels/location-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <LocationLabel location={option.object} />
</SelectOption>
