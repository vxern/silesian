<script>
  import constants from "$lib/constants";
  import { m } from "$lib/paraglide/messages.js";
  import IconArrowRightFill from "~icons/mingcute/arrow-right-fill";

  let capsLockEnabled = $state(false);
  let shiftEnabled = $state(false);
  let upperCaseEnabled = $derived(capsLockEnabled || shiftEnabled);

  function handleKeypress(event) {
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

  function insertLetter(letter) {
    const { selectionStart, selectionEnd } = input;

    input.value =
      input.value.substring(0, selectionStart) +
      letter +
      input.value.substring(selectionEnd);
    input.focus();
    input.setSelectionRange(selectionStart + 1, selectionStart + 1);
  }
</script>

<svelte:window onkeydown={handleKeypress} onkeyup={handleKeypress} />

<section
  class="min-h-screen min-w-screen flex bg-zinc-900 font-bitter items-center text-center"
>
  <section class="flex-1 flex flex-col gap-y-16 items-center">
    <article>
      <h1 class="text-8xl text-yellow-400 font-bold">
        {constants.projectName}
      </h1>
      <h1 class="text-2xl text-blue-500">{m["subtitle.variants.1"]()}</h1>
    </article>
    <article class="flex flex-col gap-y-4 items-center w-[40%]">
      <section class="w-full flex flex-row gap-x-4 items-center">
        <input
          class="rounded-lg w-full p-4 text-lg bg-zinc-700 text-zinc-300 placeholder:text-zinc-400"
          type="text"
          placeholder={m["search.placeholder"]()}
          bind:this={input}
        />
        <button
          class="rounded-lg h-fit p-4 text-lg font-bold bg-green-700 text-green-300 hover:bg-green-600 hover:text-green-200"
        >
          <IconArrowRightFill />
        </button>
      </section>
      <section class="flex gap-x-4 w-full">
        {#each specialLetters() as letter}
          <button
            class="rounded-lg size-8 text-lg font-bold bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-200"
            onclick={() => insertLetter(letter)}
          >
            {letter}
          </button>
        {/each}
      </section>
    </article>
    <article>
      <span class="cursor-default text-sm">
        <span class="italic text-zinc-600 hover:cursor-text">
          {m["help.want_to_help"]()}
        </span>
        <span
          class="italic text-green-600 hover:text-green-500 hover:cursor-pointer"
        >
          {m["help.find_out_how"]()}
        </span>
      </span>
    </article>
  </section>
</section>
