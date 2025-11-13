<script>
  import { clsx } from "clsx/lite";

  const { text, colour = "red" } = $props();

  let colourClasses;
  switch (colour) {
    case "yellow":
      colourClasses = "text-white bg-yellow-500 outline-2 outline-yellow-400";
      break;
    case "zinc":
      colourClasses = "text-zinc-100 bg-zinc-500 outline-2 outline-zinc-400";
      break;
    case "blue":
      colourClasses = "text-blue-100 bg-blue-500 outline-2 outline-blue-400";
      break;
    case "red":
      colourClasses = "text-red-100 bg-red-500 outline-2 outline-red-400";
      break;
  }
</script>

<section
  class={clsx(
    "absolute top-[-0.5rem] right-[-0.5rem] text-xs rounded-full px-1 inline-flex items-center justify-center",
    colourClasses
  )}
>
  {text}
</section>
