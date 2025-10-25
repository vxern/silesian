<script>
  import { m } from "$lib/paraglide/messages";
  import { page } from "$app/state";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import ExitLineIcon from "~icons/mingcute/exit-line";
  import constants from "$lib/constants/core";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Loading from "../../components/meta/loading.svelte";

  // TODO(vxern): Do this on the server side.
  onMount(() => {
    if (!session) {
      goto("/login");
    }
  });
</script>

<svelte:head>
  <meta name="description" content={m["routes.account.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

{#if page.data.session}
  <Page.Root>
    <Page.Header>
      <Page.Title title={m["routes.account.title"]()} />
    </Page.Header>
    <Page.Divider />
    <table class="border-separate border-spacing-1 text-left">
      <thead class="text-blue-500">
        <tr>
          <th scope="col" class="border-b-1 border-b-zinc-700"
            >{m["routes.account.attributes.avatar"]()}</th
          >
          <th scope="col" class="border-b-1 border-b-zinc-700"
            >{m["routes.account.attributes.username"]()}</th
          >
          <th scope="col" class="border-b-1 border-b-zinc-700"
            >{m["routes.account.attributes.email"]()}</th
          >
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="w-[35%] border-b-1 border-b-zinc-800">
            <img
              class="w-16 my-4 rounded-md"
              src={page.data.session.user.image}
              alt={m["routes.account.attributes.avatar"]()}
            />
          </td>
          <td class="w-[35%] border-b-1 border-b-zinc-800">
            {page.data.session.user.name}
          </td>
          <td class="w-[35%] border-b-1 border-b-zinc-800">
            {page.data.session.user.email}
          </td>
        </tr>
      </tbody>
    </table>
    <section>
      <button
        class="cursor-pointer flex items-center gap-x-1 outline-1 outline-blue-500 bg-blue-700 hover:bg-blue-600 text-blue-200 hover:text-blue-100 rounded-lg text-md font-bold p-2"
      >
        <ExitLineIcon />
        {m["routes.account.logout"]()}
      </button>
    </section>
  </Page.Root>
{:else}
  <Loading />
{/if}
