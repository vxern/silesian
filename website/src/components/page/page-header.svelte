<script>
  const { children } = $props();
</script>

<section class="flex flex-col items-center gap-y-8">
  {@render children?.()}
</section>
