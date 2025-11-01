<script>
  import DownLineIcon from "~icons/mingcute/down-line";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";
  import Label from "./label.svelte";

  const {
    name,
    label,
    description,
    options: getOptions,
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
  let options = getOptions();
  let currentOptions = $state(options);
  function search(event) {
    currentOptions = filterOptions(options, searchValue);
  }

  let selectedValue = $state();
  let selectedOption = $state();
  function select(option, value) {
    selectedValue = value ?? option;
    selectedOption = option;
    dropdownTooltip?.hide();
  }

  let searchEnabled = $state(false);
  function enableSearch() {
    searchEnabled = true;
  }

  function disableSearch() {
    searchEnabled = false;
  }
</script>

<section class="hidden">
  <section bind:this={dropdownElement} class="flex flex-col gap-y-2 py-1.5">
    <input {name} type="hidden" bind:value={selectedValue} />
    {#each currentOptions as option}
      <Component
        {option}
        {formatOption}
        selected={selectedValue}
        select={select.bind(this)}
      ></Component>
    {/each}
  </section>
</section>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <Label {name} {label} {description} />
  <section
    class="flex-1 flex justify-between items-center bg-zinc-800 outline-1 outline-zinc-600 p-2 rounded-lg w-full cursor-pointer"
    {@attach trigger}
  >
    {#if searchEnabled || !selectedValue}
      <input
        type="text"
        class="w-full p-1 border-none outline-none ring-0 focus:outline-none focus:border-none focus:ring-0 shadow-none box-shadow-none"
        bind:value={searchValue}
        oninput={search.bind(this)}
      />
    {:else if selectedValue}
      <span class="rounded-lg bg-zinc-700 text-sm py-1 px-1.5">
        {formatOption(selectedOption)}
      </span>
    {/if}
    <section>
      <DownLineIcon class="ml-2" />
    </section>
  </section>
</section>
