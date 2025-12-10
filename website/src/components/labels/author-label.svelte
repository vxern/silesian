<script>
  import Label from "./label.svelte";
  import User2LineIcon from "~icons/mingcute/user-2-line";

  const { author } = $props();
</script>

<Label class="bg-zinc-700" icon={User2LineIcon}>
  {author.name}
</Label>
