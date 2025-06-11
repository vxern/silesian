<script>
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import "tippy.js/themes/material.css";
  import SearchBar from "../components/search/search-bar.svelte";
  import { onMount } from "svelte";
  import NavigationSection from "../components/navigation/navigation-section.svelte";
  import SocialsSection from "../components/socials/socials-section.svelte";
  import { goto } from "$app/navigation";
  import Loading from "../components/meta/loading.svelte";
  import VersionSection from "../components/version/version-section.svelte";
  import VersionLabel from "../components/version/version-label.svelte";

  // TODO(vxern): Je ku tymu lepszy spusōb?
  const splashKeys = [
    "routes.home.splashes.one",
    "routes.home.splashes.two",
    "routes.home.splashes.three",
    "routes.home.splashes.four",
    "routes.home.splashes.five",
    "routes.home.splashes.six",
    "routes.home.splashes.seven",
    "routes.home.splashes.eight",
  ];
  const splash = m[splashKeys[Math.floor(Math.random() * splashKeys.length)]]();

  let statistics = $state();
  async function fetchStatistics() {
    const response = await fetch("/api/statistics");
    statistics = await response.json();
  }

  onMount(() => {
    fetchStatistics();
  });
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.home.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.home.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />
<SocialsSection />
<VersionSection />

<section class="flex-1 flex flex-col gap-y-16 items-center">
  <article>
    <h1>
      <span class="text-8xl text-yellow-400 font-bold">
        {constants.project.name}
      </span>
      <VersionLabel />
    </h1>
    <h2 class="text-2xl text-blue-500">{splash}</h2>
  </article>
  <SearchBar />
  <article>
    {#if statistics}
      <h6 class="text-sm italic">
        <span class="text-zinc-600">
          {m["routes.home.help.imported.total"]({
            count: statistics.imported.total,
          })}
          {m["routes.home.help.imported.this_month"]({
            count: statistics.imported.this_month,
          })}
        </span>
        <br />
        <span class="text-zinc-600">
          {m["routes.home.help.want_to_help"]()}
        </span>
        <button
          class="cursor-pointer text-green-600 hover:text-green-500"
          onclick={() => goto("/contribute")}
        >
          {m["routes.home.help.find_out_how"]()}
        </button>
      </h6>
    {:else}
      <Loading />
    {/if}
  </article>
</section>
