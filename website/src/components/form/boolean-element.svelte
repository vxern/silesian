<script>
  import { m } from "$lib/paraglide/messages";
  import Check2FillIcon from "~icons/mingcute/check-2-fill";
  import Label from "./label.svelte";

  const { name, label, description } = $props();

  let value = $state("0");
  function toggleCheckbox() {
    if (value == "0") {
      value = "1";
    } else {
      value = "0";
    }
  }
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex items-center gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-pointer"
    onclick={() => toggleCheckbox()}
  >
    <Check2FillIcon class="text-zinc-600" />
    <input {name} type="hidden" bind:value />
    {#if value == "1"}
      <span
        class="bg-green-500 text-white font-medium rounded-lg text-sm py-1 px-1.5"
      >
        {m["meta.yes"]()}
      </span>
    {:else}
      <span
        class="bg-red-500 text-white font-medium rounded-lg text-sm py-1 px-1.5"
      >
        {m["meta.no"]()}
      </span>
    {/if}
  </section>
</section>
