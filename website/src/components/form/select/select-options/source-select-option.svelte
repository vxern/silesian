<script>
  import SelectOption from "../select-option.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption highlighted={selected} select={() => select(option)}>
  <section class="flex w-full">
    <section class="basis-3/5 text-start">
      {option[0].name}
    </section>
    <section class="basis-2/5 text-end">
      {option[0].authors.join(", ")}
    </section>
  </section>
</SelectOption>
