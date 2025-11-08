<script>
  import SelectOption from "../select-option.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption highlighted={selected === option} select={() => select(option)}>
  <section class="flex w-full">
    {option[0]}
  </section>
</SelectOption>
