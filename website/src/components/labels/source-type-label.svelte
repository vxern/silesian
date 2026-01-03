<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";
  import DotGridLineIcon from "~icons/mingcute/dot-grid-line";

  const { type } = $props();
</script>

<Label class="bg-zinc-700" icon={DotGridLineIcon}>
  {m[`source_types.${type}`]()}
</Label>
