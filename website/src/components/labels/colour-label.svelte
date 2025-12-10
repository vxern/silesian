<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";
  import { resolveTailwindColour } from "../../helpers/tailwind";
  import PaletteLineIcon from "~icons/mingcute/palette-line";

  const { colour } = $props();
</script>

<Label class={resolveTailwindColour(colour)} icon={PaletteLineIcon}>
  {m[`colours.${colour}`]()}
</Label>
