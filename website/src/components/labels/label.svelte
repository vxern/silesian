<script>
  import { clsx } from "clsx/lite";

  const { class: classes, children } = $props();
</script>

<section
  class={clsx(
    "flex w-full rounded-lg p-2 font-medium text-sm text-white gap-x-2 items-center",
    classes
  )}
>
  {@render children?.()}
</section>
