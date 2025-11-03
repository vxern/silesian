<script>
  const { children, scope, class: class_ } = $props();
</script>

<th
  class="border-b-1 {scope === 'row'
    ? 'border-b-zinc-800'
    : 'border-b-zinc-700'} {class_}"
  {scope}
>
  {@render children?.()}
</th>
