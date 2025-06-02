<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import NavigationButton from "./navigation-button.svelte";
  import NavigationRow from "./navigation-row.svelte";
  import Home2LineIcon from "~icons/mingcute/home-2-line";
  import Document2LineIcon from "~icons/mingcute/document-2-line";
  import Book6LineIcon from "~icons/mingcute/book-6-line";
  import InformationLineIcon from "~icons/mingcute/information-line";
  import AlignArrowRightLineIcon from "~icons/mingcute/align-arrow-right-line";
  import User1LineIcon from "~icons/mingcute/user-1-line";

  // TODO(vxern): This is a stub.
  let authenticated = true;
</script>

<nav class="fixed top-8 right-8 flex flex-col items-end gap-y-2">
  <NavigationRow>
    <NavigationButton
      title={m["routes.home.title"]()}
      onclick={() => goto("/")}
      highlighted={page.url.pathname === "/"}
    />
    <Home2LineIcon class="text-zinc-400" />
  </NavigationRow>
  <!-- TODO(vxern): If there are results, show 'Słowo — słowo', otherwise show 'Wyszukanie — słowo' -->
  {#if page.url.pathname.startsWith("/word")}
    <NavigationRow>
      <NavigationButton
        title={`${m["routes.word.title"]()} — ${decodeURIComponent(page.url.pathname.split("/word/").at(1))}`}
        highlighted={true}
      />
      <Document2LineIcon class="text-zinc-400" />
    </NavigationRow>
  {/if}
  <NavigationRow>
    <NavigationButton
      title={m["routes.sources.title"]()}
      onclick={() => goto("/sources")}
      highlighted={page.url.pathname === "/sources"}
    />
    <Book6LineIcon class="text-zinc-400" />
  </NavigationRow>
  <NavigationRow>
    <NavigationButton
      title={m["routes.about.title"]()}
      onclick={() => goto("/about")}
      highlighted={page.url.pathname === "/about"}
    />
    <InformationLineIcon class="text-zinc-400" />
  </NavigationRow>
  {#if !authenticated}
    <NavigationRow>
      <NavigationButton
        title={m["routes.login.title"]()}
        onclick={() => goto("/login")}
        highlighted={page.url.pathname === "/login"}
      />
      <AlignArrowRightLineIcon class="text-zinc-400" />
    </NavigationRow>
  {:else}
    <NavigationRow>
      <NavigationButton
        title={m["routes.account.title"]()}
        onclick={() => goto("/account")}
        highlighted={page.url.pathname === "/account"}
      />
      <User1LineIcon class="text-zinc-400" />
    </NavigationRow>
  {/if}
</nav>
