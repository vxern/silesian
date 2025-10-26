<script>
  import { m } from "$lib/paraglide/messages";
  import { page } from "$app/state";
  import { signOut } from "@auth/sveltekit/client";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import User1LineIcon from "~icons/mingcute/user-1-line";
  import PhotoAlbum2LineIcon from "~icons/mingcute/photo-album-2-line";
  import MailLineIcon from "~icons/mingcute/mail-line";
  import Calendar2LineIcon from "~icons/mingcute/calendar-2-line";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import TimeLineIcon from "~icons/mingcute/time-line";
  import Search2LineIcon from "~icons/mingcute/search-2-line";
  import ExitLineIcon from "~icons/mingcute/exit-line";
  import HistoryAnticlockwiseLineIcon from "~icons/mingcute/history-anticlockwise-line";
  import { dayjs } from "../../helpers/dates.js";
  import constants from "$lib/constants/core";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Loading from "../../components/meta/loading.svelte";
  import calendar from "dayjs/plugin/calendar";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(calendar);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  onMount(() => {
    // TODO(vxern): Do this on the server side.
    if (!page.data.session) {
      goto("/login");
    }
  });

  // TODO(vxern): These are temporary.
  const createdAt = "2025-01-01";
  const searches = 31213;
  const additions = 123;
  const changes = 31213;
  const timeSpentUsing = dayjs.duration(2, "minutes");
  const timeSpentEditing = dayjs.duration(2, "minutes");
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
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <PhotoAlbum2LineIcon />
              {m["routes.account.attributes.base.avatar"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <User1LineIcon />
              {m["routes.account.attributes.base.username"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <MailLineIcon />
              {m["routes.account.attributes.base.email"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <Calendar2LineIcon />
              {m["routes.account.attributes.base.created_at"]()}
            </section>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="w-[25%] border-b-1 border-b-zinc-800">
            <img
              class="w-16 my-4 rounded-md"
              src={page.data.session.user.image}
              alt={m["routes.account.attributes.base.avatar"]()}
            />
          </td>
          <td class="w-[25%] border-b-1 border-b-zinc-800">
            {page.data.session.user.name}
          </td>
          <td class="w-[25%] border-b-1 border-b-zinc-800">
            {page.data.session.user.email}
          </td>
          <td class="w-[25%] border-b-1 border-b-zinc-800">
            {dayjs(createdAt).calendar()}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="border-separate border-spacing-1 text-left">
      <thead class="text-blue-500">
        <tr>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <Search2LineIcon />
              {m["routes.account.attributes.stats.searches"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <AddLineIcon />
              {m["routes.account.attributes.stats.additions"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <Pencil2LineIcon />
              {m["routes.account.attributes.stats.changes"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <TimeLineIcon />
              {m["routes.account.attributes.stats.time_spent_using"]()}
            </section>
          </th>
          <th scope="col" class="border-b-1 border-b-zinc-700">
            <section class="flex gap-x-1">
              <TimeLineIcon />
              {m["routes.account.attributes.stats.time_spent_editing"]()}
            </section>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="w-[20%] border-b-1 border-b-zinc-800">
            <section class="flex gap-x-1 items-center">
              <span>
                {searches}
              </span>
              <a href="/account/history/searches">
                <HistoryAnticlockwiseLineIcon class="text-green-400" />
              </a>
            </section>
          </td>
          <td class="w-[20%] border-b-1 border-b-zinc-800">
            <section class="flex gap-x-1 items-center">
              <span>
                {additions}
              </span>
              <a href="/account/history/additions">
                <HistoryAnticlockwiseLineIcon class="text-green-400" />
              </a>
            </section>
          </td>
          <td class="w-[20%] border-b-1 border-b-zinc-800">
            <section class="flex gap-x-1 items-center">
              <span>
                {changes}
              </span>
              <a href="/account/history/changes">
                <HistoryAnticlockwiseLineIcon class="text-green-400" />
              </a>
            </section>
          </td>
          <td class="w-[20%] border-b-1 border-b-zinc-800">
            <section class="flex gap-x-1 items-center">
              <span>
                {timeSpentUsing.humanize()}
              </span>
              <a href="/account/history/time-spent-using">
                <HistoryAnticlockwiseLineIcon class="text-green-400" />
              </a>
            </section>
          </td>
          <td class="w-[20%] border-b-1 border-b-zinc-800">
            <section class="flex gap-x-1 items-center">
              <span>
                {timeSpentEditing.humanize()}
              </span>
              <a href="/account/history/time-spent-editing">
                <HistoryAnticlockwiseLineIcon class="text-green-400" />
              </a>
            </section>
          </td>
        </tr>
      </tbody>
    </table>
    <section>
      <button
        class="cursor-pointer flex items-center gap-x-1 outline-1 outline-blue-500 bg-blue-700 hover:bg-blue-600 text-blue-200 hover:text-blue-100 rounded-lg text-md font-bold p-2"
        onclick={signOut}
      >
        <ExitLineIcon />
        {m["routes.account.logout"]()}
      </button>
    </section>
  </Page.Root>
{:else}
  <Loading />
{/if}
