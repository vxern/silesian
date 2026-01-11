<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Search2LineIcon from "~icons/mingcute/search-2-fill";
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import tippy from "tippy.js";
  import { clsx } from "clsx/lite";
  import "tippy.js/themes/material.css";
  import Label from "../labels/label.svelte";

  // TODO(vxern): Add autocomplete.
  // TODO(vxern): Auto-focus.

  const { lemma } = page.params;

  let shiftEnabled = $state();
  let capsLockEnabled = $state();
  let shiftReset = $state();
  let capsLockReset = $state();
  let capitaliseSpecialLetters = $derived(shiftEnabled || capsLockEnabled);
  let searchQuery = $state(lemma ?? "");
  let inputElement;
  let submitElement;
  let lettersElement;
  let autocompleteElement;
  let autocompleteTooltip;
  let missingWordTooltip;
  let needToResetCapsTooltip;

  function onWindowKeyDown(event) {
    switch (event.key) {
      case "Shift":
        shiftEnabled = true;
        shiftReset = true;
        break;
      case "CapsLock":
        capsLockEnabled = true;
        capsLockReset = true;
        break;
    }
  }

  function onWindowKeyUp(event) {
    switch (event.key) {
      case "Shift":
        shiftEnabled = false;
        shiftReset = true;
        break;
      case "CapsLock":
        capsLockEnabled = false;
        capsLockReset = true;
        break;
    }
  }

  function insertSpecialLetter(letter) {
    const { selectionStart, selectionEnd } = inputElement;

    inputElement.value =
      inputElement.value.substring(0, selectionStart) +
      letter +
      inputElement.value.substring(selectionEnd);
    inputElement.focus();
    inputElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
  }

  function searchTermProvided() {
    inputElement.value = inputElement.value.trim();
    return inputElement.value.length > 0;
  }

  function onInputKeyPress(event) {
    if (event.getModifierState("Shift")) {
      shiftEnabled = true;
    } else if (event.getModifierState("CapsLock")) {
      capsLockEnabled = true;
    }

    if (event.key === "Enter") {
      search();
    }
  }

  function search() {
    if (!searchTermProvided()) {
      missingWordTooltip.hide();
      missingWordTooltip.show();
      return;
    }

    autocompleteTooltip.hide();
    missingWordTooltip.hide();
    needToResetCapsTooltip.hide();

    goto(encodeURI(`/lemma/${encodeURIComponent(inputElement.value)}`));
  }

  function onBlurWindow() {
    shiftReset = !shiftEnabled;
    capsLockReset = !capsLockEnabled;

    if (shiftReset && capsLockReset) {
      return;
    }

    needToResetCapsTooltip.show();
  }

  $effect(() => {
    inputElement.value = lemma ? decodeURIComponent(lemma) : "";
  });

  $effect(() => {
    autocompleteTooltip = tippy(inputElement, {
      content: autocompleteElement,
      allowHTML: true,
      trigger: "mousedown",
      placement: "bottom-start",
      interactive: true,
      onShow: () => {
        if (!searchTermProvided()) {
          return false;
        }
      },
    });
  });

  let autocompletedLemmas = $state([]);
  $effect(async () => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 3) {
      autocompleteTooltip.hide();
      return;
    }

    const entries = await fetch(
      `/entries/autocomplete?include_unpublished&query=${encodeURIComponent(trimmed)}`
    ).then((result) => result.json());

    if (entries.length > 0) {
      if (inputElement === document.activeElement) {
        autocompleteTooltip.hide();
        autocompleteTooltip.show();
      }

      autocompletedLemmas = Array.from(
        new Set(entries.map((entry) => entry.normalised_lemma ?? entry.lemma))
      );
    } else {
      autocompleteTooltip.hide();
    }
  });

  $effect(() => {
    missingWordTooltip = tippy(inputElement, {
      content: m["components.search_bar.missing_word"](),
      trigger: "mouseenter focus",
      triggerTarget: submitElement,
      placement: "top-start",
      theme: "info",
      onShow: () => {
        if (searchTermProvided()) {
          return false;
        }
      },
    });
  });

  $effect(() => {
    if (shiftReset && capsLockReset) {
      needToResetCapsTooltip?.hide();
      return;
    }

    let content;
    if (!shiftReset && !capsLockReset) {
      content = m["components.search_bar.reset_caps.both"]();
    } else if (!shiftReset) {
      content = m["components.search_bar.reset_caps.shift"]();
    } else {
      content = m["components.search_bar.reset_caps.caps_lock"]();
    }
    if (needToResetCapsTooltip) {
      needToResetCapsTooltip.setContent(content);
      return;
    }

    needToResetCapsTooltip = tippy(lettersElement, {
      content,
      placement: "bottom",
      trigger: "manual",
      theme: "warning",
      hideOnClick: false,
      onShow: () => {
        if (searchTermProvided()) {
          return false;
        }
      },
    });
  });

  function searchFromAutocomplete(term) {
    inputElement.value = term;
    autocompleteTooltip.hide();
    search();
  }
</script>

<svelte:window
  onkeydown={onWindowKeyDown}
  onkeyup={onWindowKeyUp}
  onblur={onBlurWindow}
/>

<section class="hidden">
  <section bind:this={autocompleteElement} class="flex flex-col gap-y-2 py-1.5">
    {#each autocompletedLemmas as lemma}
      <button
        type="button"
        onclick={() => searchFromAutocomplete(lemma)}
        class="w-full cursor-pointer"
      >
        <Label class="bg-zinc-700">
          {lemma}
        </Label>
      </button>
    {/each}
  </section>
</section>

<section class="flex flex-col gap-y-4 items-center w-full">
  <section class="w-full flex flex-row gap-x-4 items-center">
    <input
      class="bg-zinc-800 outline-1 outline-zinc-600 rounded-lg w-full p-3 text-zinc-300 placeholder:text-zinc-500"
      type="text"
      placeholder={m["components.search_bar.placeholder"]()}
      onkeydown={onInputKeyPress}
      bind:this={inputElement}
      bind:value={searchQuery}
    />
    <button
      class="rounded-lg outline-1 outline-green-500 p-3 font-bold cursor-pointer bg-green-700 hover:bg-green-600 text-green-300 hover:text-green-100"
      type="submit"
      data-sveltekit-reload
      bind:this={submitElement}
      onclick={search}
    >
      <Search2LineIcon />
    </button>
  </section>
  <section class="flex gap-x-4 items-center" bind:this={lettersElement}>
    {#each constants.specialLetters as group}
      {#each group.letters as letter_}
        {@const letter = capitaliseSpecialLetters
          ? letter_.toUpperCase()
          : letter_}
        <button
          class={clsx(
            "rounded-lg size-7 font-bold cursor-pointer outline-1 outline-zinc-600 bg-zinc-800 hover:bg-zinc-700 hover:outline-zinc-500",
            group.colours
          )}
          onclick={() => insertSpecialLetter(letter)}
        >
          {letter}
        </button>
      {/each}
    {/each}
  </section>
</section>
