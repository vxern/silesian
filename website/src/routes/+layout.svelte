<script>
  import { page } from "$app/state";
  import constants from "$lib/constants";
  import { m } from "$lib/paraglide/messages";
  import tippy from "tippy.js";
  import "tippy.js/animations/shift-toward.css";
  import "tippy.js/dist/tippy.css";
  import "../app.css";
  import { onMount } from "svelte";

  let { children } = $props();

  tippy.setDefaultProps({
    animation: "shift-toward",
    hideOnClick: true,
  });

  let pageTitle = $state();
  $effect(() => {
    const root = page.url.pathname.split("/").at(0);
    if (`routes.${root}.title` in m) {
      pageTitle = m[`routes.${root}.title`]();
    }
  });
</script>

<svelte:head>
  <meta
    name="keywords"
    content="ślōnski, gŏdka, dykcjōnŏrz, narzecza, słowa, nauka"
  />
  <meta
    name="description"
    content="{constants.projectName} je zajta stworzōnŏ ku ôpisowaniu ślōnskij gŏdki a jejich narzeczy."
  />
  <meta name="subject" content="ślōnski słownik" />
  <meta name="copyright" content="silesian.eu" />
  <meta name="language" content="szl" />
  <meta name="robots" content="notranslate, noimageindex" />
  <meta name="author" content="Dorian Oszczęda" />
  <meta name="url" content="https://silesian.eu" />

  {#if pageTitle}
    <title>
      {m["title.with_page"]({
        project_name: constants.projectName,
        page_title: pageTitle,
      })}
    </title>
  {:else}
    <title>
      {m["title.without_page"]({ project_name: constants.projectName })}
    </title>
  {/if}

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
</svelte:head>

<section
  class="min-h-screen max-w-screen flex overflow-x-hidden items-center justify-center text-center py-24 px-[25%]"
>
  {@render children()}
</section>
