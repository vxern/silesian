<script>
  const { children, class: class_ } = $props();
</script>

<td class="border-b-1 border-b-zinc-800 {class_}">
  {@render children?.()}
</td>
