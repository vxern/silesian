<script>
  import { clsx } from "clsx/lite";

  const { children, class: classes } = $props();
</script>

<td class="border-b-1 border-b-zinc-800 p-2">
  <section class={clsx("flex gap-x-2", classes)}>
    {@render children?.()}
  </section>
</td>
