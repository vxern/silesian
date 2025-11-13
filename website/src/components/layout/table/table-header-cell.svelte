<script>
  import { clsx } from "clsx/lite";

  const { children, scope, class: classes } = $props();
</script>

<th class={clsx("border-b-1 p-2", classes)} {scope}>
  {@render children?.()}
</th>
