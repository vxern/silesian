<script>
  import { clsx } from "clsx/lite";

  const {
    icon: Icon,
    colour = "blue",
    type = "button",
    ...props
  } = $props();

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
    case "zinc":
      colourClasses =
        "outline-zinc-500 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 hover:text-zinc-100";
      break;
  }
</script>

<button
  class={clsx(
    "relative cursor-pointer flex items-center justify-center outline-1 rounded-md text-sm font-bold size-5",
    colourClasses
  )}
  {type}
  {...props}
>
  <Icon />
</button>
