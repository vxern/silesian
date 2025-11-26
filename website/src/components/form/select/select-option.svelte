<script>
  import { clsx } from "clsx/lite";

  const { select, selected, option, children } = $props();
</script>

<button type="button" onclick={() => select(option)} class="cursor-pointer">
  {@render children?.()}
</button>
