<script>
  const { children, class: class_ } = $props();
</script>

<td class="border-b-1 border-b-zinc-800 p-2 {class_}">
  <section class="flex gap-x-2">
    {@render children?.()}
  </section>
</td>
