<script>
  const { children } = $props();
</script>

<article class="flex flex-col gap-y-4">
  {@render children?.()}
</article>
