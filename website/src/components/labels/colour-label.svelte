<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";
  import { resolveTailwindColour } from "../../helpers/tailwind";

  const { colour } = $props();
</script>

<Label class={resolveTailwindColour(colour)}>
  {m[`colours.${colour}`]()}
</Label>
