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
  import ChecksLineIcon from "~icons/mingcute/checks-line";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import TimeLineIcon from "~icons/mingcute/time-line";
  import BookmarkLineIcon from "~icons/mingcute/bookmark-line";
  import Search2LineIcon from "~icons/mingcute/search-2-line";
  import ExitLineIcon from "~icons/mingcute/exit-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Presentation1LineIcon from "~icons/mingcute/presentation-1-line";
  import { dayjs } from "../../helpers/dates.js";
  import constants from "$lib/constants/core";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Loading from "../../components/meta/loading.svelte";
  import Button from "../../components/interactions/button.svelte";
  import IconButton from "../../components/interactions/icon-button.svelte";
  import Table from "../../components/layout/table/index.js";
  import calendar from "dayjs/plugin/calendar";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import Image from "../../components/basic/image.svelte";

  dayjs.extend(calendar);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  const { data } = $props();
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

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <Button
        colour="orange"
        icon={BookmarkLineIcon}
        onclick={() => goto("/account/bookmarks")}
      >
        {m["routes.account.bookmarks.title"]()}
      </Button>
      <Button
        colour="pink"
        icon={Presentation1LineIcon}
        onclick={() => goto("/account/statistics")}
      >
        {m["routes.account.statistics.title"]()}
      </Button>
      <section class="flex-1"></section>
      <Button
        icon={ExitLineIcon}
        tooltipMessage={m["routes.account.logout"]()}
        tooltipTheme="blue"
        onclick={signOut}
      >
        {m["routes.account.logout"]()}
      </Button>
    </Page.Actions>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell icon={PhotoAlbum2LineIcon}>
            {m["routes.account.attributes.base.avatar"]()}
          </Table.HeaderCell>
          <Table.HeaderCell icon={User1LineIcon}>
            {m["routes.account.attributes.base.username"]()}
          </Table.HeaderCell>
          <Table.HeaderCell icon={MailLineIcon}>
            {m["routes.account.attributes.base.email"]()}
          </Table.HeaderCell>
          <Table.HeaderCell icon={Calendar2LineIcon}>
            {m["routes.account.attributes.base.created_at"]()}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Image
              class="rounded-md size-20"
              src={data.user.image}
              alt={m["routes.account.attributes.base.avatar"]()}
            />
          </Table.Cell>
          <Table.Cell>
            {data.user.username}
          </Table.Cell>
          <Table.Cell>
            {data.user.email_address}
          </Table.Cell>
          <Table.Cell>
            {dayjs(data.user.version.created_at).calendar()}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </Page.Contents>
</Page.Root>
