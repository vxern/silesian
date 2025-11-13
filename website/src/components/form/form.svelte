<script>
  const { children, ...props } = $props();
</script>

<form {...props} class="flex flex-col gap-y-6">
  {@render children?.()}
</form>
