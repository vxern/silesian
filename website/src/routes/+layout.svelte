<script>
  import { page } from "$app/state";
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
  import tippy from "tippy.js";
  import "tippy.js/animations/shift-toward.css";
  import "tippy.js/dist/tippy.css";
  import "../app.css";
  import { dayjs } from "../helpers/dates.js";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  // TODO(vxern): This needs to update with settings.
  dayjs.locale("szl");

  let { children } = $props();

  if (typeof window !== "undefined") {
    tippy.setDefaultProps({
      animation: "shift-toward",
      hideOnClick: true,
    });
  }
</script>

<svelte:head>
  <meta name="keywords" content={constants.project.keywords.join(", ")} />
  <meta name="subject" content={constants.project.subject} />
  <meta name="copyright" content={constants.project.name} />
  <meta name="language" content={constants.project.language} />
  <meta name="robots" content="notranslate, noimageindex" />
  <meta name="author" content={constants.project.author} />
  <meta name="url" content={constants.project.url} />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
</svelte:head>

<!-- TODO(vxern): IMPORTANT - Theme this. -->
<SvelteToast />

<section
  class="min-h-screen max-w-screen flex overflow-x-hidden items-center justify-center text-center"
>
  {@render children()}
</section>
