<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { m } from "$lib/paraglide/messages";
  import NavigationButton from "./navigation-button.svelte";
  import Home2LineIcon from "~icons/mingcute/home-2-line";
  import Search2LineIcon from "~icons/mingcute/search-2-line";
  import CursorTextLineIcon from "~icons/mingcute/cursor-text-line";
  import Box2LineIcon from "~icons/mingcute/box-2-line";
  import QuestionLineIcon from "~icons/mingcute/question-line";
  import HandHeartLineIcon from "~icons/mingcute/hand-heart-line";
  import AlignArrowRightLineIcon from "~icons/mingcute/align-arrow-right-line";
  import User4LineIcon from "~icons/mingcute/user-4-line";
  import Palette2LineIcon from "~icons/mingcute/palette-2-line";
  import User2LineIcon from "~icons/mingcute/user-2-line";
  import Location3LineIcon from "~icons/mingcute/location-3-line";
  import IdCardLineIcon from "~icons/mingcute/idcard-line";
  import Page from "../page/index.js";

  const { permissions } = $props();
</script>

<nav class="fixed top-8 right-8 flex flex-col items-end gap-y-2">
  <NavigationButton
    onclick={() => goto("/home")}
    highlighted={page.url.pathname === "/home"}
    icon={Home2LineIcon}
  >
    {m["routes.home.title"]()}
  </NavigationButton>
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
  {#if page.data.session}
    {#if page.url.pathname.startsWith("/account/history")}
      <NavigationButton
        onclick={() => goto("/account")}
        highlighted={true}
        icon={User4LineIcon}
      >
        {#if page.url.pathname === "/account/history/searches"}
          {m["routes.account.history.searches.title"]()}
        {:else if page.url.pathname === "/account/history/additions"}
          {m["routes.account.history.additions.title"]()}
        {:else if page.url.pathname === "/account/history/changes"}
          {m["routes.account.history.changes.title"]()}
        {:else if page.url.pathname === "/account/history/reviews"}
          {m["routes.account.history.reviews.title"]()}
        {:else if page.url.pathname === "/account/history/time-spent-using"}
          {m["routes.account.history.time_spent_using.title"]()}
        {:else if page.url.pathname === "/account/history/time-spent-editing"}
          {m["routes.account.history.time_spent_editing.title"]()}
        {/if}
      </NavigationButton>
    {:else if page.url.pathname === "/account/bookmarks"}
      <NavigationButton
        onclick={() => goto("/account/bookmarks")}
        highlighted={page.url.pathname === "/account/bookmarks"}
        icon={User4LineIcon}
      >
        {m["routes.account.bookmarks.title"]()}
      </NavigationButton>
    {:else if page.url.pathname === "/account/statistics"}
      <NavigationButton
        onclick={() => goto("/account/statistics")}
        highlighted={page.url.pathname === "/account/statistics"}
        icon={User4LineIcon}
      >
        {m["routes.account.statistics.title"]()}
      </NavigationButton>
    {:else}
      <NavigationButton
        onclick={() => goto("/account")}
        highlighted={page.url.pathname === "/account"}
        icon={User4LineIcon}
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
  {#if permissions.has("locations:view") || permissions.has("authors:view") || permissions.has("sources:view") || permissions.has("categories:view") || permissions.has("entries:view") || permissions.has("users:view") || permissions.has("roles:view")}
    <section class="w-full">
      <Page.Divider />
    </section>
  {/if}
  {#if permissions.has("locations:view")}
    {#if page.url.pathname.startsWith("/locations/")}
      <NavigationButton
        onclick={() => goto("/locations")}
        highlighted={true}
        icon={Location3LineIcon}
      >
        {#if page.url.pathname === "/locations/drafts"}
          {m["routes.locations.drafts.title"]()}
        {:else if page.url.pathname === "/locations/review"}
          {m["routes.locations.review.title"]()}
        {:else if page.url.pathname === "/locations/new"}
          {m["routes.locations.new.title"]()}
        {:else if /\/locations\/\d+\/review/.test(page.url.pathname)}
          {m["routes.locations.review.title"]()}
        {/if}
      </NavigationButton>
    {:else}
      <NavigationButton
        onclick={() => goto("/locations")}
        highlighted={page.url.pathname === "/locations"}
        icon={Location3LineIcon}
      >
        {m["routes.locations.title"]()}
      </NavigationButton>
    {/if}
  {/if}
  {#if permissions.has("authors:view")}
    {#if page.url.pathname.startsWith("/authors/")}
      <NavigationButton
        onclick={() => goto("/authors")}
        highlighted={true}
        icon={User2LineIcon}
      >
        {#if page.url.pathname === "/authors/drafts"}
          {m["routes.authors.drafts.title"]()}
        {:else if page.url.pathname === "/authors/review"}
          {m["routes.authors.review.title"]()}
        {:else if page.url.pathname === "/authors/new"}
          {m["routes.authors.new.title"]()}
        {:else if /\/authors\/\d+\/review/.test(page.url.pathname)}
          {m["routes.authors.review.title"]()}
        {/if}
      </NavigationButton>
    {:else}
      <NavigationButton
        onclick={() => goto("/authors")}
        highlighted={page.url.pathname === "/authors"}
        icon={User2LineIcon}
      >
        {m["routes.authors.title"]()}
      </NavigationButton>
    {/if}
  {/if}
  {#if permissions.has("sources:view")}
    {#if page.url.pathname.startsWith("/sources/")}
      <NavigationButton
        onclick={() => goto("/sources")}
        highlighted={true}
        icon={Box2LineIcon}
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
        icon={Box2LineIcon}
      >
        {m["routes.sources.title"]()}
      </NavigationButton>
    {/if}
  {/if}
  {#if permissions.has("categories:view")}
    {#if page.url.pathname.startsWith("/categories/")}
      <NavigationButton
        onclick={() => goto("/categories")}
        highlighted={true}
        icon={Palette2LineIcon}
      >
        {#if page.url.pathname === "/categories/drafts"}
          {m["routes.categories.drafts.title"]()}
        {:else if page.url.pathname === "/categories/review"}
          {m["routes.categories.review.title"]()}
        {:else if page.url.pathname === "/categories/new"}
          {m["routes.categories.new.title"]()}
        {:else if /\/categories\/\d+\/review/.test(page.url.pathname)}
          {m["routes.categories.review.title"]()}
        {/if}
      </NavigationButton>
    {:else}
      <NavigationButton
        onclick={() => goto("/categories")}
        highlighted={page.url.pathname === "/categories"}
        icon={Palette2LineIcon}
      >
        {m["routes.categories.title"]()}
      </NavigationButton>
    {/if}
  {/if}
  {#if permissions.has("entries:view")}
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
        {:else if /\/entries\/\d+\/review/.test(page.url.pathname)}
          {m["routes.entries.review.title"]()}
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
  {/if}
  {#if permissions.has("users:view")}
    <NavigationButton
      onclick={() => goto("/users")}
      highlighted={page.url.pathname === "/users"}
      icon={User2LineIcon}
    >
      {m["routes.users.title"]()}
    </NavigationButton>
  {/if}
  {#if permissions.has("roles:view")}
    <NavigationButton
      onclick={() => goto("/roles")}
      highlighted={page.url.pathname === "/roles"}
      icon={IdCardLineIcon}
    >
      {m["routes.roles.title"]()}
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
    icon={QuestionLineIcon}
  >
    {m["routes.about.title"]()}
  </NavigationButton>
</nav>
