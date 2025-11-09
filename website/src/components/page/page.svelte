<script>
  const { children } = $props();
</script>

<section
  class="top-0 flex flex-col gap-y-6 w-full py-24 sm:px-[5%] md:px-[10%] lg:px-[15%] xl:px-[20%] 2xl:px-[25%]"
>
  {@render children?.()}
</section>
