<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";
  import UnlockLineIcon from "~icons/mingcute/unlock-line";

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

<Label class={colourClass} icon={UnlockLineIcon}>
  {m[`accesses.${access}`]()}
</Label>
