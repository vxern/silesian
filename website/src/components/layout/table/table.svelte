<script>
  import clsx from "clsx/lite";

  const { children, class: classes, ...props } = $props();
</script>

<table class={clsx("border-separate border-spacing-1 text-left", classes)}>
  {@render children?.()}
</table>
