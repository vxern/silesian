<script>
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import "tippy.js/themes/material.css";
  import SearchBar from "../components/search/search-bar.svelte";
  import { onMount } from "svelte";
  import LanguageSection from "../components/language/language-section.svelte";
  import SubdomainNavigationSection from "../components/subdomain-navigation/subdomain-navigation-section.svelte";
  import NavigationSection from "../components/navigation/navigation-section.svelte";
  import SocialsSection from "../components/socials/socials-section.svelte";
  import { goto } from "$app/navigation";
  import Loading from "../components/meta/loading.svelte";
  import VersionSection from "../components/version/version-section.svelte";
  import Page from "../components/page/index.js";
  import PageDivider from "../components/page/page-divider.svelte";

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

<Page.Root>
  <section class="flex-1 flex flex-col gap-y-8 items-center">
    <article>
      <h1>
        <span class="text-8xl text-yellow-400 font-bold">
          {constants.project.name}
        </span>
      </h1>
      <h2 class="text-2xl text-blue-500">{splash}</h2>
    </article>
  </section>
  <Page.Divider />
  <SubdomainNavigationSection />
</Page.Root>
