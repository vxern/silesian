<script>
  import { m } from "$lib/paraglide/messages";
  import Label from "./label.svelte";
  import Text2LineIcon from "~icons/mingcute/text-2-line";

  const { orthography } = $props();
</script>

<Label class="bg-zinc-700" icon={Text2LineIcon}>
  {m[`orthographies.${orthography}`]()}
</Label>
