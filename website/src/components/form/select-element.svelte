<script>
  import { isEqual } from "es-toolkit/compat";
  import DownLineIcon from "~icons/mingcute/down-line";
  import MenuFillIcon from "~icons/mingcute/menu-fill";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";
  import Label from "./label.svelte";

  const {
    name,
    label,
    description,
    value,
    icon: Icon = MenuFillIcon,
    options: getOptions,
    multiple = false,
    custom = false,
    formatOption = (option) => option,
    filterOptions = (options, search) => {
      const searchLowerCase = search.toLowerCase();

      return options.filter((option) =>
        formatOption(option).toLowerCase().includes(searchLowerCase)
      );
    },
    component: Component,
  } = $props();

  let dropdownElement;
  let dropdownTooltip;
  const trigger = (sourceElement) => {
    dropdownTooltip = tippy(sourceElement, {
      content: dropdownElement,
      allowHTML: true,
      trigger: "mousedown",
      placement: "bottom-start",
      maxWidth: sourceElement.clientWidth,
      interactive: true,
      onShow: enableSearch.bind(this),
      onHide: disableSearch.bind(this),
    });
  };

  // TODO(vxern): What to do about the empty section element being left after the dropdown element moves into tippy?

  let searchValue = $state();
  let options = $state([]);
  let currentOptions = $state([]);
  function searchOptions(event) {
    const newOptions = filterOptions(options, searchValue);

    if (isEqual(currentOptions, newOptions)) {
      return;
    }

    dropdownTooltip.hide();
    currentOptions = newOptions;
    dropdownTooltip.show();
  }

  async function setOptions() {
    options = (await getOptions?.()) ?? [];
    currentOptions = options;
  }

  onMount(() => {
    setOptions();
  });

  let selectedValues = $state();
  let selectedValue = $derived(
    multiple ? JSON.stringify(selectedValues) : selectedValues?.at(0)
  );
  let selectedOptions = $state();
  if (value) {
    if (multiple) {
      selectedValues = value;
      selectedOptions = value;
    } else {
      selectedValues = [value];
      selectedOptions = [value];
    }
  } else {
    selectedValues = [];
    selectedOptions = [];
  }

  function select(option, value) {
    if (multiple) {
      selectedValues.push(value ?? option);
      selectedOptions.push(option);
    } else {
      selectedValues = [value ?? option];
      selectedOptions = [option];
    }
    dropdownTooltip?.hide();
  }

  let search;
  let searchEnabled = $state(false);
  function enableSearch() {
    searchEnabled = true;
  }

  function disableSearch() {
    searchEnabled = false;
  }

  function handleKeyPress(event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    addItem();
  }
</script>

<section class="hidden">
  <section bind:this={dropdownElement} class="flex flex-col gap-y-2 py-1.5">
    {#if currentOptions && currentOptions.length > 0}
      {#each currentOptions as option}
        <Component
          {option}
          {formatOption}
          selected={selectedValue}
          select={select.bind(this)}
        ></Component>
      {/each}
    {:else}
      <section class="italic text-zinc-500">
        {m["meta.no_results"]()}
      </section>
    {/if}
  </section>
</section>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex gap-x-3 items-center bg-zinc-800 outline-1 outline-zinc-600 p-3 rounded-lg w-full cursor-pointer"
    {@attach trigger}
    onclick={() => search.focus()}
  >
    <Icon class="text-zinc-600" />
    <input {name} type="hidden" bind:value={selectedValue} />
    <section class="flex-1 flex">
      {#if searchEnabled || selectedOptions.length === 0}
        <input
          type="text"
          class="w-full invisible-input cursor-pointer"
          bind:this={search}
          bind:value={searchValue}
          oninput={searchOptions.bind(this)}
          onkeydown={handleKeyPress}
        />
      {:else if selectedOptions.length > 0}
        <section class="flex-1 flex gap-x-1 gap-y-1 flex-wrap">
          {#each selectedOptions as selectedOption}
            <span
              class="rounded-lg bg-zinc-700 text-sm py-1 px-1.5 wrap-anywhere"
            >
              {formatOption(selectedOption)}
            </span>
          {/each}
        </section>
      {/if}
    </section>
    <DownLineIcon class="ml-2 text-zinc-600" />
  </section>
</section>
