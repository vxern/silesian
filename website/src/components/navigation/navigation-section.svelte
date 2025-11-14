<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import NavigationButton from "./navigation-button.svelte";
  import Home2LineIcon from "~icons/mingcute/home-2-line";
  import Search2LineIcon from "~icons/mingcute/search-2-line";
  import CursorTextLineIcon from "~icons/mingcute/cursor-text-line";
  import Book6LineIcon from "~icons/mingcute/book-6-line";
  import InformationLineIcon from "~icons/mingcute/information-line";
  import HandHeartLineIcon from "~icons/mingcute/hand-heart-line";
  import AlignArrowRightLineIcon from "~icons/mingcute/align-arrow-right-line";
  import User2LineIcon from "~icons/mingcute/user-2-line";
  import HistoryAnticlockwiseLine from "~icons/mingcute/history-anticlockwise-line";
  import Page from "../page/index.js";
</script>

<nav class="fixed top-8 right-8 flex flex-col items-end gap-y-2">
  <NavigationButton
    onclick={() => goto("/home")}
    highlighted={page.url.pathname === "/home"}
    icon={Home2LineIcon}
  >
    {m["routes.home.title"]()}
  </NavigationButton>
  {#if page.data.session}
    {#if page.url.pathname.startsWith("/account/history")}
      <NavigationButton
        onclick={() => goto("/account")}
        highlighted={true}
        icon={HistoryAnticlockwiseLine}
      >
        {#if page.url.pathname === "/account/history/searches"}
          {m["routes.account.history.searches.title"]()}
        {:else if page.url.pathname === "/account/history/additions"}
          {m["routes.account.history.additions.title"]()}
        {:else if page.url.pathname === "/account/history/changes"}
          {m["routes.account.history.changes.title"]()}
        {:else if page.url.pathname === "/account/history/time-spent-using"}
          {m["routes.account.history.time_spent_using.title"]()}
        {:else if page.url.pathname === "/account/history/time-spent-editing"}
          {m["routes.account.history.time_spent_editing.title"]()}
        {/if}
      </NavigationButton>
    {:else}
      <NavigationButton
        onclick={() => goto("/account")}
        highlighted={page.url.pathname === "/account"}
        icon={User2LineIcon}
      >
        {m["routes.account.title"]()}
      </NavigationButton>
    {/if}
  {:else}
    <NavigationButton
      onclick={() => goto("/login")}
      highlighted={page.url.pathname === "/login"}
      icon={AlignArrowRightLineIcon}
    >
      {m["routes.login.title"]()}
    </NavigationButton>
  {/if}
  <section class="w-full">
    <Page.Divider />
  </section>
  <!-- TODO(vxern): If there are results, show 'Hasło — <hasło>', otherwise show 'Wyszukanie — <wyszukanie>' -->
  {#if page.url.pathname.startsWith("/lemma/")}
    <NavigationButton
      onclick={() => goto("/search")}
      highlighted={true}
      icon={Search2LineIcon}
    >
      {m["routes.lemma.title"]()}
    </NavigationButton>
  {:else}
    <NavigationButton
      onclick={() => goto("/search")}
      highlighted={page.url.pathname === "/search"}
      icon={Search2LineIcon}
    >
      {m["routes.search.title"]()}
    </NavigationButton>
  {/if}
  {#if page.url.pathname.startsWith("/sources/")}
    <NavigationButton
      onclick={() => goto("/sources")}
      highlighted={true}
      icon={Book6LineIcon}
    >
      {#if page.url.pathname === "/sources/drafts"}
        {m["routes.sources.drafts.title"]()}
      {:else if page.url.pathname === "/sources/review"}
        {m["routes.sources.review.title"]()}
      {:else if page.url.pathname === "/sources/new"}
        {m["routes.sources.new.title"]()}
      {:else if /\/sources\/\d+\/review/.test(page.url.pathname)}
        {m["routes.sources.review.title"]()}
      {/if}
    </NavigationButton>
  {:else}
    <NavigationButton
      onclick={() => goto("/sources")}
      highlighted={page.url.pathname === "/sources"}
      icon={Book6LineIcon}
    >
      {m["routes.sources.title"]()}
    </NavigationButton>
  {/if}
  {#if page.url.pathname.startsWith("/entries/")}
    <NavigationButton
      onclick={() => goto("/entries")}
      highlighted={true}
      icon={CursorTextLineIcon}
    >
      {#if page.url.pathname === "/entries/drafts"}
        {m["routes.entries.drafts.title"]()}
      {:else if page.url.pathname === "/entries/review"}
        {m["routes.entries.review.title"]()}
      {:else if page.url.pathname === "/entries/new"}
        {m["routes.entries.new.title"]()}
      {/if}
    </NavigationButton>
  {:else}
    <NavigationButton
      onclick={() => goto("/entries")}
      highlighted={page.url.pathname === "/entries"}
      icon={CursorTextLineIcon}
    >
      {m["routes.entries.title"]()}
    </NavigationButton>
  {/if}
  <section class="w-full">
    <Page.Divider />
  </section>
  <NavigationButton
    onclick={() => goto("/contribute")}
    highlighted={page.url.pathname === "/contribute"}
    icon={HandHeartLineIcon}
  >
    {m["routes.contribute.title"]()}
  </NavigationButton>
  <NavigationButton
    onclick={() => goto("/about")}
    highlighted={page.url.pathname === "/about"}
    icon={InformationLineIcon}
  >
    {m["routes.about.title"]()}
  </NavigationButton>
</nav>
