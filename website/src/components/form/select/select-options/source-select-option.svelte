<script>
  import SelectOption from "../select-option.svelte";

  const { option, selected, select } = $props();
</script>

<SelectOption
  highlighted={selected === option.id}
  select={() => select(option, option.id)}
>
  <section class="flex w-full">
    <section class="basis-3/5 text-start">
      {option.name}
    </section>
    <section class="basis-2/5 text-end">
      {option.authors.join(", ")}
    </section>
  </section>
</SelectOption>
