<script>
  const { children } = $props();
</script>

<section class="w-full h-12 mx-2 rounded-lg bg-zinc-700">
  {@render children?.()}
</section>
