<script>
  import Label from "./label.svelte";

  const { author } = $props();
</script>

<Label class="bg-zinc-700">
  {author.name}
</Label>
