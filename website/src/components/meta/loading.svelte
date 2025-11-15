<script>
  import { Diamonds } from "svelte-loading-spinners";

  const { colour } = $props();

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

<section class="flex justify-center">
  <!-- TODO(vxern): Can we get legit Tailwind sizing here? -->
  <Diamonds color={colourClass} size="56" duration="2s" />
</section>
