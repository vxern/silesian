<script>
  import { clsx } from "clsx/lite";

  const { children, class: classes, id, index, rowspan } = $props();
</script>

<tr
  {id}
  class={clsx(index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-910", classes)}
  {rowspan}
>
  {@render children?.()}
</tr>
