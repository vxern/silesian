<script>
  import constants from "$lib/constants";
  import { m } from "$lib/paraglide/messages";

  let { children } = $props();
  import "../app.css";
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

  <title>silesian.eu — {m.title()}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
</svelte:head>

{@render children()}
