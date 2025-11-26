<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";

  const { access } = $props();

  let colourClass;
  switch (access) {
    case "closed":
      colourClass = "bg-red-500";
      break;
    case "limited":
      colourClass = "bg-yellow-500";
      break;
    case "open":
      colourClass = "bg-green-500";
      break;
  }
</script>

<Label class={colourClass}>
  {m[`accesses.${access}`]()}
</Label>
