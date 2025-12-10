<script>
  import Label from "./label.svelte";

  const { location } = $props();
</script>

<Label class="bg-zinc-700">
  {location.name}
</Label>
