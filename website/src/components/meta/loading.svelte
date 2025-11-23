<script>
  import { clsx } from "clsx/lite";
  import { Diamonds } from "svelte-loading-spinners";

  const { class: classes, colour = "yellow" } = $props();

  let colourClass;
  switch (colour) {
    case "red":
      colourClass = "var(--color-red-400)";
      break;
    case "yellow":
      colourClass = "var(--color-yellow-400)";
      break;
    case "blue":
      colourClass = "var(--color-blue-400)";
      break;
  }
</script>

<section class={clsx("flex items-center justify-center", classes)}>
  <!-- TODO(vxern): Can we get legit Tailwind sizing here? -->
  <Diamonds color={colourClass} size="56" duration="2s" />
</section>
