<script>
  const { children } = $props();
</script>

<section class="flex gap-x-2 items-center">
  {@render children?.()}
</section>
