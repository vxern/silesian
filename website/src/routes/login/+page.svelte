<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import { SignIn } from "@auth/sveltekit/components";
  import constants from "$lib/constants/core";
</script>

<svelte:head>
  <meta name="description" content={m["routes.login.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.login.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.login.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <section class="flex justify-center gap-x-4">
      <article class="cursor-pointer p-4 flex-1 bg-zinc-800 rounded-md">
        <SignIn provider="github" signInPage="login">
          <section
            slot="submitButton"
            class="flex flex-col items-center gap-y-3"
          >
            <enhanced:img
              src="/static/logos/github.svg"
              class="size-10"
              alt={m["routes.login.providers.github"]()}
            />
            <span class="font-bold">
              {m["routes.login.providers.github"]()}
            </span>
          </section>
        </SignIn>
      </article>
      <section class="cursor-pointer p-4 flex-1 bg-zinc-800 rounded-md">
        <SignIn provider="discord" signInPage="login">
          <article
            slot="submitButton"
            class="flex flex-col items-center gap-y-3"
          >
            <enhanced:img
              src="/static/logos/discord.svg"
              class="size-10"
              alt={m["routes.login.providers.discord"]()}
            />
            <span class="font-bold">
              {m["routes.login.providers.discord"]()}
            </span>
          </article>
        </SignIn>
      </section>
      <section class="cursor-pointer p-4 flex-1 bg-zinc-800 rounded-md">
        <SignIn provider="google" signInPage="login">
          <article
            slot="submitButton"
            class="flex flex-col items-center gap-y-3"
          >
            <enhanced:img
              src="/static/logos/google.svg"
              class="size-10"
              alt={m["routes.login.providers.google"]()}
            />
            <span class="font-bold">
              {m["routes.login.providers.google"]()}
            </span>
          </article>
        </SignIn>
      </section>

      <section class="cursor-pointer p-4 flex-1 bg-zinc-800 rounded-md">
        <SignIn provider="linkedin" signInPage="login">
          <article
            slot="submitButton"
            class="flex flex-col items-center gap-y-3"
          >
            <enhanced:img
              src="/static/logos/linkedin.svg"
              class="size-10"
              alt={m["routes.login.providers.linkedin"]()}
            />
            <span class="font-bold">
              {m["routes.login.providers.linkedin"]()}
            </span>
          </article>
        </SignIn>
      </section>
      <section class="cursor-pointer p-4 flex-1 bg-zinc-800 rounded-md">
        <SignIn provider="twitter" signInPage="login">
          <article
            slot="submitButton"
            class="flex flex-col items-center gap-y-3"
          >
            <enhanced:img
              src="/static/logos/x.svg"
              class="size-10"
              alt={m["routes.login.providers.x"]()}
            />
            <span class="font-bold">
              {m["routes.login.providers.x"]()}
            </span>
          </article>
        </SignIn>
      </section>
      <!-- 
    {#if $page.data.session}
      {#if $page.data.session.user?.image}
        <img
          src={$page.data.session.user.image}
          class="avatar"
          width="256"
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
    {/if} -->
    </section></Page.Contents
  >
</Page.Root>
