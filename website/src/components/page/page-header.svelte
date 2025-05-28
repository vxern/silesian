<script>
  const { children } = $props();
</script>

<article class="flex flex-col items-center">
  {@render children?.()}
</article>
