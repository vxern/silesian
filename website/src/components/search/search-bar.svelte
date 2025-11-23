<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Search2LineIcon from "~icons/mingcute/search-2-fill";
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";

  // TODO(vxern): Add autocomplete.

  const { lemma } = page.params;

  let shiftEnabled = $state(undefined);
  let capsLockEnabled = $state(undefined);
  let shiftReset = $state(undefined);
  let capsLockReset = $state(undefined);
  let inputElement;
  let submitElement;
  let lettersElement;
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

  function specialLetters() {
    if (shiftEnabled || capsLockEnabled) {
      return constants.specialLetters.map((letter) => letter.toUpperCase());
    }

    return constants.specialLetters;
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

    if (event.key !== "Enter") {
      return;
    }

    search();
  }

  function search() {
    if (!searchTermProvided()) {
      missingWordTooltip.hide();
      missingWordTooltip.show();
      return;
    }

    missingWordTooltip.destroy();
    needToResetCapsTooltip.destroy();

    window.location.href = encodeURI(`/lemma/${inputElement.value}`);
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
    inputElement.value = lemma ?? "";
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

    const content =
      !shiftReset && !capsLockReset
        ? m["components.search_bar.reset_caps.both"]()
        : !shiftReset
          ? m["components.search_bar.reset_caps.shift"]()
          : m["components.search_bar.reset_caps.caps_lock"]();
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
</script>

<svelte:window
  onkeydown={onWindowKeyDown}
  onkeyup={onWindowKeyUp}
  onblur={onBlurWindow}
/>

<section class="flex flex-col gap-y-4 items-center w-full">
  <section class="w-full flex flex-row gap-x-4 items-center">
    <input
      class="bg-zinc-800 outline-1 outline-zinc-600 rounded-lg w-full p-3 text-zinc-300 placeholder:text-zinc-500"
      type="text"
      placeholder={m["components.search_bar.placeholder"]()}
      onkeydown={onInputKeyPress}
      bind:this={inputElement}
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
  <section>
    <article class="flex gap-x-4 w-full" bind:this={lettersElement}>
      {#each specialLetters() as letter}
        <button
          class="rounded-lg size-7 font-bold cursor-pointer outline-1 outline-zinc-600 bg-zinc-800 hover:bg-zinc-700 hover:outline-zinc-500 text-zinc-300 hover:text-zinc-200"
          onclick={() => insertSpecialLetter(letter)}
        >
          {letter}
        </button>
      {/each}
    </article>
  </section>
</section>
