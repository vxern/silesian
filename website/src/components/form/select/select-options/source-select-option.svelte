<script>
  import SelectOption from "../select-option.svelte";

  const { option, selected, select } = $props();
  const [identifier, source] = option;
</script>

<SelectOption
  highlighted={selected === identifier}
  select={() => select(option, identifier)}
>
  <section class="flex w-full">
    <section class="basis-3/5 text-start">
      {source.name}
    </section>
    <section class="basis-2/5 text-end">
      {source.authors.join(", ")}
    </section>
  </section>
</SelectOption>
