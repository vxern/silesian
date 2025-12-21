<script>
  import { clsx } from "clsx/lite";

  const {
    children,
    class: classes,
    padding = true,
    highlighted = false,
    rowspan,
  } = $props();
</script>

<td
  class={clsx(
    "border-b-1",
    padding && "p-2",
    highlighted ? "border-b-yellow-600 bg-zinc-800" : "border-b-zinc-800"
  )}
  {rowspan}
>
  <section class={clsx("flex gap-x-2", classes)}>
    {@render children?.()}
  </section>
</td>
