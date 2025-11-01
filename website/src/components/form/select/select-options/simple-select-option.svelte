<script>
  import SelectOption from "../select-option.svelte";

  const { option, selected, formatOption, select } = $props();
</script>

<SelectOption highlighted={selected === option} select={() => select(option)}>
  <section class="flex w-full">
    {formatOption(option)}
  </section>
</SelectOption>
