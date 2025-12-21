<script>
  import clsx from "clsx/lite";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  const { children, class: classes, ...props } = $props();

  onMount(() => {
    const id = $page.url.hash.slice(1);
    if (!$page.url.hash) {
      return;
    }

    const row = document.getElementById(id);
    if (!row) {
      return;
    }

    row.scrollIntoView();
  });
</script>

<table class={clsx("border-separate border-spacing-1 text-left", classes)}>
  {@render children?.()}
</table>
