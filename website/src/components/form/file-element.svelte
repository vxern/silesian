<script>
  import PhotoAlbumLineIcon from "~icons/mingcute/photo-album-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Label from "./label.svelte";

  const {
    name,
    label,
    description,
    value,
    accept = "image/*",
    multiple = false,
    required = false,
  } = $props();

  let input = $state();
  let files = $state([]);

  if (value) {
    files = [value].flat().map((buffer) => new Blob([buffer]));
  }

  function onFilesChanged() {
    if (multiple) {
      files = Array.from(input.files);
    } else {
      files = Array.from(input.files).slice(0, 1);
    }
  }

  function removeFile(event, file) {
    event.stopPropagation();

    const fileToRemove = file;
    const dataTransfer = new DataTransfer();
    for (const file of input.files) {
      if (file.name !== fileToRemove.name) {
        dataTransfer.items.add(file);
      }
    }

    input.files = dataTransfer.files;
    files = Array.from(dataTransfer.files);
  }
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} {required} />
  <section
    class="flex gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-pointer"
    onclick={() => input.click()}
  >
    <input
      {accept}
      id={name}
      {name}
      {multiple}
      class="hidden"
      bind:this={input}
      onchange={() => onFilesChanged()}
      type="file"
    />
    <PhotoAlbumLineIcon class="text-zinc-600" />
    {#if files.length > 0}
      {#each Array.from(files) as file}
        <section class="relative">
          <!-- TODO(vxern): Display differently depending on the media type. -->
          <img src={URL.createObjectURL(file)} class="max-h-96" />
          <Button
            colour="red"
            icon={Delete2LineIcon}
            tooltipMessage={m["components.interactions.button.delete"]()}
            tooltipTheme="delete"
            class="absolute top-2 right-2"
            size="small"
            onclick={(event) => removeFile(event, file)}
          />
        </section>
      {/each}
    {/if}
  </section>
</section>
