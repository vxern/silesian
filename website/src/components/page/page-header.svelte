<script>
  const { children } = $props();
</script>

<article class="flex flex-col items-center gap-y-8">
  {@render children?.()}
</article>
