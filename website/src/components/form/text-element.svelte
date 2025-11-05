<script>
  import Label from "./label.svelte";
  import Text2FillIcon from "~icons/mingcute/text-2-fill";

  let input;

  const { name, label, description, ...props } = $props();
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex items-center gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-text"
    onclick={() => input.focus()}
  >
    <Text2FillIcon class="text-zinc-600" />
    <input {name} {...props} class="invisible-input" bind:this={input} />
  </section>
</section>
