<script>
  const { source } = $props();
</script>

<section class="flex w-full">
  <section class="basis-3/5 text-start">
    {source.name}
  </section>
  <section class="basis-2/5 text-end">
    {source.authors.join(", ")}
  </section>
</section>
