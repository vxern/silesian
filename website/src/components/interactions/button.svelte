<script>
  import { clsx } from "clsx/lite";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";

  const {
    icon: Icon,
    colour = "blue",
    type = "button",
    children,
    tooltipMessage,
    tooltipTheme,
    ...props
  } = $props();

  let tooltipElement;

  if (tooltipMessage) {
    let tooltip;
    $effect(() => {
      tooltip = tippy(tooltipElement, {
        content: tooltipMessage,
        trigger: "mouseenter focus",
        placement: "top-start",
        theme: tooltipTheme ?? "info",
      });
    });
  }

  let colourClasses;
  switch (colour) {
    case "yellow":
      colourClasses =
        "outline-yellow-400 bg-yellow-600 hover:bg-yellow-500 text-yellow-100 hover:text-white";
      break;
    case "blue":
      colourClasses =
        "outline-blue-500 bg-blue-700 hover:bg-blue-600 text-blue-200 hover:text-blue-100";
      break;
    case "green":
      colourClasses =
        "outline-green-500 bg-green-700 hover:bg-green-600 text-green-200 hover:text-green-100";
      break;
    case "red":
      colourClasses =
        "outline-red-500 bg-red-700 hover:bg-red-600 text-red-200 hover:text-red-100";
      break;
    case "orange":
      colourClasses =
        "outline-orange-400 bg-orange-600 hover:bg-orange-650 text-orange-100 hover:text-white";
      break;
    case "pink":
      colourClasses =
        "outline-pink-500 bg-pink-700 hover:bg-pink-600 text-pink-200 hover:text-pink-100";
      break;
    case "zinc":
      colourClasses =
        "outline-zinc-500 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 hover:text-zinc-100";
      break;
  }
</script>

<button
  class={clsx(
    "relative cursor-pointer flex items-center gap-x-1 outline-1 rounded-lg font-bold p-2",
    colourClasses
  )}
  {type}
  {...props}
  bind:this={tooltipElement}
>
  <Icon />
  {@render children?.()}
</button>
