<script>
  import Label from "./label.svelte";

  const { name, label, description, ...props } = $props();
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <input
    {name}
    {...props}
    class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg"
  />
</section>
