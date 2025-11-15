<script>
  import { clsx } from "clsx/lite";

  const { children, scope, class: classes, icon: Icon } = $props();
</script>

<th class={clsx("border-b-1 p-2", classes)} {scope}>
  <section class="flex gap-x-1">
    {#if Icon}
      <Icon />
    {/if}
    {@render children?.()}
  </section>
</th>
