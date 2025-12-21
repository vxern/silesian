<script>
  import { clsx } from "clsx/lite";

  const { icon: Icon, class: classes, children } = $props();
</script>

<section
  class={clsx(
    "flex w-full rounded-lg p-2 font-medium text-sm text-nowrap text-white gap-x-2 items-center",
    classes
  )}
>
  {#if Icon}
    <Icon />
  {/if}
  {@render children?.()}
</section>
