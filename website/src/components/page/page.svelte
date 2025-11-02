<script>
  const { children, view = "normal" } = $props();

  let padding;
  switch (view) {
    case "normal":
      padding = "py-24 px-[25%]";
      break;
    case "wide":
      padding = "py-24 px-[15%]";
      break;
  }
</script>

<section class="top-0 flex flex-col gap-y-6 w-full {padding}">
  {@render children?.()}
</section>
