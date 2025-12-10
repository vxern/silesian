<script>
  import Label from "./label.svelte";
  import LocationLineIcon from "~icons/mingcute/location-line";

  const { location } = $props();
</script>

<Label class="bg-zinc-700" icon={LocationLineIcon}>
  {location.name}
</Label>
