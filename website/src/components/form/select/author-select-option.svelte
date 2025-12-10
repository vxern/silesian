<script>
  import SelectOption from "./select-option.svelte";
  import AuthorLabel from "../../labels/author-label.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption {selected} {select} {option}>
  <AuthorLabel author={option[0]} />
</SelectOption>
