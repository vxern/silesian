<script>
  import { clsx } from "clsx/lite";

  const { children, highlighted, supported, onclick } = $props();
</script>

<button
  class={clsx(
    "flex gap-x-2 items-center rounded-lg text-xl",
    onclick && supported !== false && "cursor-pointer",
    onclick && supported === false && "cursor-no-drop",
    highlighted && "text-yellow-400",
    !highlighted && supported !== false && "text-zinc-400",
    !highlighted && supported === false && "text-zinc-500",
    !!onclick && highlighted && "hover:text-yellow-300",
    onclick && !highlighted && "hover:text-zinc-300",
    onclick && !highlighted && supported === false && "hover:text-zinc-400"
  )}
  onclick={supported ? onclick : null}
>
  {@render children?.()}
</button>
