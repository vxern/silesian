<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import NavigationButton from "./navigation-button.svelte";

  // TODO(vxern): This is a stub.
  let authenticated = false;
</script>

<nav class="fixed top-8 right-8 flex flex-col items-end gap-y-2">
  <NavigationButton
    title={m["routes.home.title"]()}
    onclick={() => goto("/")}
    highlighted={page.url.pathname === "/"}
  />
  <!-- TODO(vxern): If there are results, show 'Słowo — słowo', otherwise show 'Wyszukanie — słowo' -->
  {#if page.url.pathname.startsWith("/word")}
    <NavigationButton
      title={`${m["routes.word.title"]()} — ${decodeURIComponent(page.url.pathname.split("/word/").at(1))}`}
      highlighted={true}
    />
  {/if}
  <NavigationButton
    title={m["routes.sources.title"]()}
    onclick={() => goto("/sources")}
    highlighted={page.url.pathname === "/sources"}
  />
  {#if !authenticated}
    <NavigationButton
      title={m["routes.login.title"]()}
      onclick={() => goto("/login")}
      highlighted={page.url.pathname === "/login"}
    />
  {:else}
    <NavigationButton
      title={m["routes.account.title"]()}
      onclick={() => goto("/account")}
      highlighted={page.url.pathname === "/account"}
    />
  {/if}
</nav>
