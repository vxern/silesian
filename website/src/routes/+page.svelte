<script>
  import { goto } from "$app/navigation";
  import IconArrowRightFill from "~icons/mingcute/arrow-right-fill";
  import IconSettings from "~icons/mingcute/settings-6-line";
  import constants from "$lib/constants";
  import { m } from "$lib/paraglide/messages";
  import tippy from "tippy.js";
  import "tippy.js/themes/material.css";

  let capsLockEnabled = $state(false);
  let shiftEnabled = $state(false);
  let upperCaseEnabled = $derived(capsLockEnabled || shiftEnabled);

  function onWindowKeyPress(event) {
    switch (event.key) {
      case "Shift":
        shiftEnabled = !shiftEnabled;
        break;
      case "CapsLock":
        capsLockEnabled = !capsLockEnabled;
        break;
    }
  }

  let input;

  function specialLetters() {
    if (upperCaseEnabled) {
      return constants.specialLetters.map((letter) => letter.toUpperCase());
    }

    return constants.specialLetters;
  }

  function insertSpecialLetter(letter) {
    const { selectionStart, selectionEnd } = input;

    input.value =
      input.value.substring(0, selectionStart) +
      letter +
      input.value.substring(selectionEnd);
    input.focus();
    input.setSelectionRange(selectionStart + 1, selectionStart + 1);
  }

  function searchTermProvided() {
    return input.value.trim().length > 0;
  }

  let submit;
  let searchTooltip;

  $effect(() => {
    searchTooltip = tippy(input, {
      content: m["search.missing_word"](),
      trigger: "mouseenter focus",
      triggerTarget: submit,
      onShow: () => {
        if (searchTermProvided()) {
          return false;
        }
      },
    });
  });

  function onInputKeyPress(event) {
    if (event.key !== "Enter") {
      return;
    }

    search();
  }

  function search() {
    if (!searchTermProvided()) {
      searchTooltip.hide();
      searchTooltip.show();
      return;
    }

    goto(encodeURI(`/word/${value}`));
  }

  function openSettings() {
    goto("/settings");
  }
</script>

<svelte:window onkeydown={onWindowKeyPress} onkeyup={onWindowKeyPress} />

<section class="flex-1 flex flex-col gap-y-16 items-center">
  <button class="absolute top-8 right-8" onclick={openSettings}>
    <IconSettings class="size-8 text-zinc-500 hover:text-zinc-400" />
  </button>
  <article>
    <h1 class="text-8xl text-yellow-400 font-bold">
      {constants.projectName}
    </h1>
    <h2 class="text-2xl text-blue-500">{m["splash"]()}</h2>
  </article>
  <article class="flex flex-col gap-y-4 items-center w-[40%]">
    <section class="w-full flex flex-row gap-x-4 items-center">
      <input
        class="rounded-lg w-full p-4 text-lg bg-zinc-700 text-zinc-300 placeholder:text-zinc-400"
        type="text"
        placeholder={m["search.placeholder"]()}
        onkeydown={onInputKeyPress}
        oninput={onInputChange}
        bind:this={input}
      />
      <button
        class="rounded-lg h-fit p-4 text-lg font-bold bg-green-700 text-green-300 hover:bg-green-600 hover:text-green-200"
        type="submit"
        bind:this={submit}
        onclick={search}
      >
        <IconArrowRightFill />
      </button>
    </section>
    <section class="flex gap-x-4 w-full">
      {#each specialLetters() as letter}
        <button
          class="rounded-lg size-8 text-lg font-bold bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-200"
          onclick={() => insertSpecialLetter(letter)}
        >
          {letter}
        </button>
      {/each}
    </section>
  </article>
  <article>
    <h6 class="cursor-default text-sm">
      <span class="italic text-zinc-600 hover:cursor-text">
        {m["help.want_to_help"]()}
      </span>
      <span
        class="italic text-green-600 hover:text-green-500 hover:cursor-pointer"
      >
        {m["help.find_out_how"]()}
      </span>
    </h6>
  </article>
</section>
