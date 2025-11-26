<script>
  import Label from "./label.svelte";

  const { text } = $props();
</script>

<Label class="bg-zinc-700">
  {text}
</Label>
