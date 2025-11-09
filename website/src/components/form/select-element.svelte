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
    filterOptions = (options, search) => {
      const searchLowerCase = search.toLowerCase();

      return options.filter((option) =>
        option[0].toLowerCase().includes(searchLowerCase)
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
  let filteredOptions = $state([]);
  function searchOptions(event) {
    const newFilteredOptions = filterOptions(options, searchValue);

    if (isEqual(filteredOptions, newFilteredOptions)) {
      return;
    }

    dropdownTooltip.hide();
    filteredOptions = newFilteredOptions;
    dropdownTooltip.show();
  }

  let selectedOptions = $state([]);
  // TODO(vxern): This is wrong.
  let selectedOptionValues = $derived(
    selectedOptions.map((option) => option[1])
  );
  let selectedValue = $derived(
    multiple ? JSON.stringify(selectedOptionValues) : selectedOptionValues.at(0)
  );

  async function setOptions() {
    options = (await getOptions?.()) ?? [];
    if (!value) {
      selectedOptions = [];
    } else if (multiple) {
      selectedOptions = options.filter((option) => value.includes(option[1]));
    } else {
      selectedOptions = options.filter((option) => option[1] === value);
    }
    filteredOptions = options;
  }

  onMount(() => {
    setOptions();
  });

  function select(option) {
    if (multiple) {
      selectedOptions.push(option);
    } else {
      selectedOptions = [option];
    }

    dropdownTooltip?.hide();
  }

  function unselect(option) {
    // TODO(vxern): IMPORTANT! Gotta implement this.
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
    {#if filteredOptions.length > 0}
      {#each filteredOptions as option}
        <Component
          {option}
          selected={selectedOptionValues.includes(option[1])}
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
            <Component
              option={selectedOption}
              selected={false}
              select={() => unselect(selectedOption)}
            ></Component>
          {/each}
        </section>
      {/if}
    </section>
    <DownLineIcon class="ml-2 text-zinc-600" />
  </section>
</section>
