<script lang="ts">
  import constants from "$lib/constants";
  import { m } from "$lib/paraglide/messages.js";

  const specialLetters = [
    "ã",
    "ć",
    "ł",
    "ŏ",
    "ō",
    "ô",
    "õ",
    "ń",
    "ś",
    "ź",
    "ż",
  ];
</script>

<section
  class="min-h-screen min-w-screen flex bg-zinc-900 font-bitter items-center text-center"
>
  <section class="flex-1 flex flex-col gap-y-16 items-center">
    <article class="flex-1">
      <h1 class="text-8xl text-yellow-400 font-bold">
        {constants.projectName}
      </h1>
      <h1 class="text-2xl text-blue-500">{m["subtitle.variants.1"]()}</h1>
    </article>
    <article class="flex-1 flex flex-col gap-y-4 items-center w-[40%]">
      <input
        type="text"
        placeholder={m["search.placeholder"]()}
        class="rounded-md w-full text-lg p-4 bg-zinc-700 text-zinc-300 placeholder:text-zinc-400"
      />
      <section class="flex-1 flex gap-x-4 w-full">
        {#each specialLetters as letter}
          <button
            class="rounded-md size-8 text-lg font-bold bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
          >
            {letter}
          </button>
        {/each}
      </section>
    </article>
    <article>
      <span class="cursor-default">
        <span class="italic text-md text-zinc-600 hover:cursor-text">
          {m["help.want_to_help"]()}
        </span>
        &nbsp;
        <span
          class="italic text-md text-green-600 hover:text-green-500 hover:cursor-pointer"
        >
          {m["help.find_out_how"]()}
        </span>
      </span>
    </article>
  </section>
</section>
