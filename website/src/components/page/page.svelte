<script>
  const { children, padding } = $props();
</script>

<section
  class="top-0 flex flex-col gap-y-6 w-full {padding ?? 'py-24 px-[25%]'}"
>
  {@render children?.()}
</section>
