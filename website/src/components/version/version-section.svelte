<script>
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";
</script>

<nav class="fixed bottom-8 right-8 flex gap-x-2 text-base text-zinc-500">
  <a class="cursor-pointer" href={constants.links.release}>
    {m["components.version_section.version"]({
      version: import.meta.env.PACKAGE_VERSION,
    })}
  </a>
</nav>
