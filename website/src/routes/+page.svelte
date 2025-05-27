<script>
  import { goto } from "$app/navigation";
  import IconSettings from "~icons/mingcute/settings-6-line";
  import constants from "$lib/constants";
  import { m } from "$lib/paraglide/messages";
  import "tippy.js/themes/material.css";
  import SearchBar from "../components/search-bar/search-bar.svelte";

  const splashKeys = [
    "routes.home.splashes.one",
    "routes.home.splashes.two",
    "routes.home.splashes.three",
    "routes.home.splashes.four",
    "routes.home.splashes.five",
    "routes.home.splashes.six",
    "routes.home.splashes.seven",
    "routes.home.splashes.eight",
    "routes.home.splashes.nine",
  ];
  const splash = m[splashKeys[Math.floor(Math.random() * splashKeys.length)]]();

  function openSettings() {
    goto("/settings");
  }
</script>

<section class="flex-1 flex flex-col gap-y-16 items-center">
  <button class="absolute top-8 right-8" onclick={openSettings}>
    <IconSettings class="size-8 text-zinc-500 hover:text-zinc-400" />
  </button>
  <article>
    <h1 class="text-8xl text-yellow-400 font-bold">
      {constants.projectName}
    </h1>
    <h2 class="text-2xl text-blue-500">{splash}</h2>
  </article>
  <SearchBar />
  <article>
    <h6 class="cursor-default text-sm">
      <span class="italic text-zinc-600 hover:cursor-text">
        {m["routes.home.help.want_to_help"]()}
      </span>
      <span
        class="italic text-green-600 hover:text-green-500 hover:cursor-pointer"
      >
        {m["routes.home.help.find_out_how"]()}
      </span>
    </h6>
  </article>
</section>
