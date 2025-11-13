<script>
  const { children, index } = $props();
</script>

<tr class={index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-910"}>
  {@render children?.()}
</tr>
