<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";

  const { licence } = $props();

  let colourClass;
  switch (licence) {
    case "proprietary":
      colourClass = "bg-red-500";
      break;
    case "granted":
      colourClass = "bg-lime-500";
      break;
    case "public":
      colourClass = "bg-green-500";
      break;
  }
</script>

<Label class={colourClass}>
  {m[`licences.${licence}`]()}
</Label>
