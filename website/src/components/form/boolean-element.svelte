<script>
  import Check2FillIcon from "~icons/mingcute/check-2-fill";
  import Label from "./label.svelte";
  import BooleanLabel from "../../components/labels/boolean-label.svelte";

  const { name, label, description, required = false } = $props();

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
  <Label {name} {label} {description} {required} />
  <section
    class="flex-1 flex items-center gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-pointer"
    onclick={() => toggleCheckbox()}
  >
    <Check2FillIcon class="text-zinc-600" />
    <input {name} type="hidden" bind:value />
    <BooleanLabel {value} />
  </section>
</section>
