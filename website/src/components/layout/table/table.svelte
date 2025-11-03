<script>
  const { children } = $props();
</script>

<table class="border-separate border-spacing-1 text-left">
  {@render children?.()}
</table>
