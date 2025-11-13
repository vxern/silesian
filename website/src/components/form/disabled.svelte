<script>
  const { children, ...props } = $props();
</script>

<section class="cursor-not-allowed">
  <fieldset
    {...props}
    disabled
    class="flex flex-col gap-y-6 pointer-events-none"
  >
    {@render children?.()}
  </fieldset>
</section>
