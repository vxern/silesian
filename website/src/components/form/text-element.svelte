<script>
  import Label from "./label.svelte";
  import Text2FillIcon from "~icons/mingcute/text-2-fill";
  import Link2FillIcon from "~icons/mingcute/link-2-fill";
  import HashtagFillIcon from "~icons/mingcute/hashtag-fill";
  import AsteriskFillIcon from "~icons/mingcute/asterisk-fill";

  let input;

  const {
    name,
    label,
    description,
    type = "text",
    multiple = false,
    ...props
  } = $props();

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

    if (!multiple) {
      return;
    }

    if (event.key === "Enter") {
      pushItem();
    } else if (event.key === "Backspace") {
      popItem();
    }
  }

  let items = $state([]);
  function pushItem() {
    const trimmedValue = input.value.trim();
    if (trimmedValue.length === 0) {
      return;
    }

    input.value = "";
    items.push(trimmedValue);
  }

  function popItem() {
    if (items.length === 0 || input.value.length !== 0) {
      return;
    }

    items.pop();
  }
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex items-center gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-text"
    onclick={() => input.focus()}
  >
    {#if multiple}
      <section class="relative">
        <Icon class="text-zinc-600" />
        <AsteriskFillIcon
          class="absolute text-zinc-600 size-3 top-[-5px] right-[-8px]"
        />
      </section>
      <input name={`${name}[]`} type="hidden" />
      <section class="flex-1 flex gap-x-1 gap-y-1 flex-wrap">
        {#each items as item}
          <span
            class="grow-1 rounded-lg bg-zinc-700 text-sm py-1 px-1.5 wrap-anywhere"
          >
            {item}
          </span>
        {/each}
        <input
          {type}
          {...props}
          class="flex-1 invisible-input"
          bind:this={input}
          onkeydown={handleKeyPress}
        />
      </section>
    {:else}
      <Icon class="text-zinc-600" />
      <input
        {name}
        {type}
        {...props}
        class="invisible-input"
        bind:this={input}
        onkeydown={handleKeyPress}
      />
    {/if}
  </section>
</section>
