<script>
  import Label from "./label.svelte";
  import Text2FillIcon from "~icons/mingcute/text-2-fill";
  import Link2FillIcon from "~icons/mingcute/link-2-fill";
  import HashtagFillIcon from "~icons/mingcute/hashtag-fill";

  let input;

  const {
    name,
    label,
    description,
    value,
    type = "text",
    multiple = false,
    ...props
  } = $props();

  // TODO(vxern): Extract this to some common place.

  let Icon;
  switch (type) {
    case "text":
      Icon = Text2FillIcon;
      break;
    case "number":
      Icon = HashtagFillIcon;
      break;
    case "url":
      Icon = Link2FillIcon;
      break;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex items-center gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-text"
    onclick={() => input.focus()}
  >
    <Icon class="text-zinc-600" />
    <input
      {name}
      {type}
      {value}
      {...props}
      class="flex-1 invisible-input"
      bind:this={input}
      onkeydown={handleKeyPress}
    />
  </section>
</section>
