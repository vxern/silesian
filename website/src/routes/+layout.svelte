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
  <meta name="keywords" content={constants.project.keywords.join(", ")} />
  <meta name="subject" content={constants.project.subject} />
  <meta name="copyright" content={constants.project.name} />
  <meta name="language" content={constants.project.language} />
  <meta name="robots" content="notranslate, noimageindex" />
  <meta name="author" content={constants.project.title} />
  <meta name="url" content={constants.project.url} />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
</svelte:head>

<section
  class="min-h-screen max-w-screen flex overflow-x-hidden items-center justify-center text-center py-24 px-[25%]"
>
  {@render children()}
</section>
