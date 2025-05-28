<script>
  const { children } = $props();
</script>

<section class="top-0 flex flex-col gap-y-6 w-full">
  {@render children?.()}
</section>
