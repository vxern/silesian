<script>
  const { children } = $props();
</script>

<section class="flex flex-col gap-y-4">
  {@render children?.()}
</section>
