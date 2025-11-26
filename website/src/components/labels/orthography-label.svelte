<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";

  const { orthography } = $props();
</script>

<Label class="bg-zinc-700">
  {m[`orthographies.${orthography}`]()}
</Label>
