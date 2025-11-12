<script>
  const { children } = $props();
</script>

<section
  class="top-0 flex flex-col gap-y-6 w-full py-24 md:px-[5%] lg:px-[10%] xl:px-[15%] 2xl:px-[20%]"
>
  {@render children?.()}
</section>
