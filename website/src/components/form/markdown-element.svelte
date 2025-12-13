<script>
  import Label from "./label.svelte";
  import { renderMarkdown } from "../../helpers/markdown.js";

  const {
    name,
    label,
    description,
    value,
    previewMessage,
    required = false,
  } = $props();

  let contents = $state(value ?? "");
  let renderedContents = $derived(renderMarkdown(contents));
</script>

<section class="flex-1 flex flex-col gap-y-1">
  <Label {name} {label} {description} {required} />
  <section class="flex flex-1">
    <textarea
      type="text"
      {name}
      rows="16"
      class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-4 rounded-l-lg text-sm font-mono h-120"
      bind:value={contents}
    ></textarea>
    <section
      class="flex-1 outline-1 bg-zinc-900 inset-shadow-[0_2px_10px_rgba(0,0,0,0.25)] inset-shadow-black outline-zinc-600 p-4 rounded-r-lg text-start h-120 overflow-y-auto"
    >
      {#if contents}
        {@html renderedContents}
      {:else}
        <span class="text-sm text-zinc-600">
          {previewMessage}
        </span>
      {/if}
    </section>
  </section>
</section>
