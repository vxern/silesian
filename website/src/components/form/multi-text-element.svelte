<script>
  import Label from "./label.svelte";
  import Text2FillIcon from "~icons/mingcute/text-2-fill";
  import Link2FillIcon from "~icons/mingcute/link-2-fill";
  import HashtagFillIcon from "~icons/mingcute/hashtag-fill";
  import AddFillIcon from "~icons/mingcute/add-fill";
  import { SvelteSet } from "svelte/reactivity";

  let input;

  const {
    name,
    label,
    description,
    value = [],
    type = "text",
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
      pushItem();
      event.preventDefault();
    } else if (event.key === "Backspace") {
      popItem();
    }
  }

  let search;
  let items = new SvelteSet(value);
  let itemsArray = value;
  function pushItem() {
    const trimmedValue = search.value.trim();
    if (trimmedValue.length === 0) {
      return;
    }

    if (items.has(trimmedValue)) {
      return;
    }

    items.add(trimmedValue);
    itemsArray.push(trimmedValue);

    search.value = "";
    input.value = JSON.stringify(itemsArray);
  }

  function popItem() {
    if (items.length === 0 || search.value.length !== 0) {
      return;
    }

    const poppedValue = itemsArray.pop();
    items.delete(poppedValue);

    input.value = JSON.stringify(itemsArray);
  }
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex items-center gap-x-3 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 p-3 w-full rounded-lg cursor-text"
    onclick={() => search.focus()}
  >
    <section class="relative">
      <Icon class="text-zinc-600" />
      <AddFillIcon
        class="absolute text-zinc-600 size-3 top-[-7px] right-[-7px]"
      />
    </section>
    <input
      name={`${name}[]`}
      type="hidden"
      value={JSON.stringify(value ?? "")}
      bind:this={input}
    />
    <section class="flex-1 flex gap-x-1 gap-y-1 flex-wrap">
      {#each items as item}
        <span class="rounded-lg bg-blue-600 text-sm py-1 px-1.5 wrap-anywhere">
          {item}
        </span>
      {/each}
      <input
        {type}
        {...props}
        class="flex-1 invisible-input"
        bind:this={search}
        onkeydown={handleKeyPress}
        onblur={pushItem}
      />
    </section>
  </section>
</section>
