<script>
  import { clsx } from "clsx/lite";

  const { children, highlighted, onclick } = $props();
</script>

<button
  class={clsx(
    "flex gap-x-2 items-center font-bold text-xl",
    onclick && "cursor-pointer",
    highlighted && "text-yellow-400",
    !highlighted && "text-zinc-400",
    !!onclick && highlighted && "hover:text-yellow-300",
    onclick && !highlighted && "hover:text-zinc-300"
  )}
  {onclick}
>
  {@render children?.()}
</button>
