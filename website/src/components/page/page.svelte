<script>
  const { children } = $props();
</script>

<section class="w-full flex flex-col gap-y-12">
  {@render children?.()}
</section>
