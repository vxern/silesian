<script>
  import { clsx } from "clsx/lite";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";

  const {
    icon: Icon,
    colour = "blue",
    type = "button",
    children,
    class: classes,
    size = "normal",
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
        "outline-red-400 bg-red-600 hover:bg-red-500 text-red-100 hover:text-white";
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

  let sizeClasses;
  switch (size) {
    case "normal":
      sizeClasses = "rounded-lg p-2 text";
      break;
    case "small":
      sizeClasses = "rounded-md p-1 text-sm";
      break;
  }
</script>

<button
  class={clsx(
    "cursor-pointer flex items-center gap-x-1 outline-1 font-bold",
    colourClasses,
    sizeClasses,
    classes
  )}
  {type}
  {...props}
  bind:this={tooltipElement}
>
  <Icon />
  {@render children?.()}
</button>
