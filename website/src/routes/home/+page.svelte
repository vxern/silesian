<script>
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import "tippy.js/themes/material.css";
  import SearchBar from "../../components/search/search-bar.svelte";
  import MainSplash from "../../components/splashes/main-splash.svelte";
  import { onMount } from "svelte";
  import LanguageSection from "../../components/language/language-section.svelte";
  import SubdomainNavigationSection from "../../components/subdomain-navigation/subdomain-navigation-section.svelte";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import SocialsSection from "../../components/socials/socials-section.svelte";
  import VersionSection from "../../components/version/version-section.svelte";
  import DonationSection from "../../components/donation/donation-section.svelte";
  import Page from "../../components/page/index.js";

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

<LanguageSection />
<SubdomainNavigationSection />
<NavigationSection />
<SocialsSection />
<DonationSection />
<VersionSection />

<Page.Root>
  <section class="flex-1 flex flex-col gap-y-6 items-center">
    <MainSplash />
    <!-- <article>
      {#if statistics}
        <aside class="text-sm italic flex flex-col gap-y-1">
          <span class="text-zinc-600">
            {m["routes.home.help.imported.total"]({
              count: statistics.imported.total,
            })}
            {m["routes.home.help.imported.this_month"]({
              count: statistics.imported.this_month,
            })}
          </span>
          <span>
            <span class="text-zinc-600">
              {m["routes.home.help.want_to_help"]()}
            </span>
            <button
              class="cursor-pointer text-green-600 hover:text-green-500"
              onclick={() => goto("/contribute")}
            >
              {m["routes.home.help.find_out_how"]()}
            </button>
          </span>
        </aside>
      {:else}
        <Loading />
      {/if}
    </article> -->
    <SearchBar />
  </section>
</Page.Root>
