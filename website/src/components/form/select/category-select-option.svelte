<script>
  import SelectOption from "./select-option.svelte";
  import CategoryLabel from "../../labels/category-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <CategoryLabel category={option[1]} />
</SelectOption>
