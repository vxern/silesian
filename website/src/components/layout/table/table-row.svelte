<script>
  import { clsx } from "clsx/lite";

  const { children, class: classes, index } = $props();
</script>

<tr class={clsx(index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-910", classes)}>
  {@render children?.()}
</tr>
