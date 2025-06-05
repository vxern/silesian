<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import { page } from "$app/stores";
  import { SignIn, SignOut } from "@auth/sveltekit/components";
  import constants from "$lib/constants";
</script>

<svelte:head>
  <meta name="description" content={m["routes.signin.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.signin.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.signin.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    {#if $page.data.session}
      {#if $page.data.session.user?.image}
        <img
          src={$page.data.session.user.image}
          class="avatar"
          alt="User Avatar"
        />
      {/if}
      <span class="signedInText">
        <small>Signed in as</small><br />
        <strong>{$page.data.session.user?.name ?? "User"}</strong>
      </span>
      <SignOut>
        <div slot="submitButton" class="buttonPrimary">Sign out</div>
      </SignOut>
    {:else}
      <span class="notSignedInText">You are not signed in</span>
      <SignIn>
        <div slot="submitButton" class="buttonPrimary">Sign in</div>
      </SignIn>
      <SignIn provider="github" />
      <SignIn provider="discord" />
      <SignIn provider="google" />
      <SignIn provider="linkedin" />
      <SignIn provider="twitter" />
    {/if}
  </Page.Contents>
</Page.Root>
