<script>
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import SubdomainNavigationSectionUnpositioned from "../components/subdomain-navigation/subdomain-navigation-section-unpositioned.svelte";
  import Page from "../components/page/index.js";
  import MainSplash from "../components/splashes/main-splash.svelte";
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
  <MainSplash />
  <Page.Divider />
  <SubdomainNavigationSectionUnpositioned />
</Page.Root>
