<script>
  import { m } from "$lib/paraglide/messages";
  import SelectElement from "./select-element.svelte";
  import SimpleSelectOption from "./select/select-options/simple-select-option.svelte";
  import Check2FillIcon from "~icons/mingcute/check-2-fill";

  const { name, label, description } = $props();
</script>

<SelectElement
  {name}
  {label}
  {description}
  icon={Check2FillIcon}
  formatOption={(boolean) => m[`meta.${boolean}`]()}
  options={() => ["yes", "no"]}
  component={SimpleSelectOption}
/>
