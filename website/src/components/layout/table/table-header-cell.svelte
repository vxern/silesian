<script>
  import { clsx } from "clsx/lite";

  const {
    children,
    scope,
    class: classes,
    icon: Icon,
    rowspan,
    colspan,
  } = $props();
</script>

<th class={clsx("border-b-1 p-2", classes)} {scope} {rowspan} {colspan}>
  <section class="flex gap-x-1">
    {#if Icon}
      <Icon />
    {/if}
    {@render children?.()}
  </section>
</th>
