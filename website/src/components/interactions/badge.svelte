<script>
  import { clsx } from "clsx/lite";
  import Loading from "../meta/loading.svelte";
  import Error from "../meta/error.svelte";

  const { text, colour = "red" } = $props();

  let colourClasses;
  switch (colour) {
    case "yellow":
      colourClasses = "text-white bg-yellow-500 outline-2 outline-yellow-300";
      break;
    case "zinc":
      colourClasses = "text-zinc-100 bg-zinc-500 outline-2 outline-zinc-300";
      break;
    case "blue":
      colourClasses = "text-blue-100 bg-blue-500 outline-2 outline-blue-300";
      break;
    case "red":
      colourClasses = "text-red-100 bg-red-500 outline-2 outline-red-300";
      break;
  }
</script>

<section
  class={clsx(
    "absolute top-[-0.5rem] right-[-0.5rem] text-xs rounded-full px-1 inline-flex items-center justify-center",
    colourClasses
  )}
>
  {#await text}
    <Loading {colour} />
  {:then text}
    {text}
  {:catch}
    <Error />
  {/await}
</section>
