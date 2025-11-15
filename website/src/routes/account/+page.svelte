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
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
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
    <section class="flex flex-col">
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
                class="rounded-md"
                src={page.data.session.user.image}
                alt={m["routes.account.attributes.base.avatar"]()}
              />
            </Table.Cell>
            <Table.Cell>
              {page.data.session.user.name}
            </Table.Cell>
            <Table.Cell>
              {page.data.session.user.email}
            </Table.Cell>
            <Table.Cell>
              {dayjs(createdAt).calendar()}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell icon={Search2LineIcon}>
              {m["routes.account.attributes.stats.searches"]()}
            </Table.HeaderCell>
            <Table.HeaderCell icon={AddLineIcon}>
              {m["routes.account.attributes.stats.additions"]()}
            </Table.HeaderCell>
            <Table.HeaderCell icon={Pencil2LineIcon}>
              {m["routes.account.attributes.stats.changes"]()}
            </Table.HeaderCell>
            <Table.HeaderCell icon={TimeLineIcon}>
              {m["routes.account.attributes.stats.time_spent_using"]()}
            </Table.HeaderCell>
            <Table.HeaderCell icon={TimeLineIcon}>
              {m["routes.account.attributes.stats.time_spent_editing"]()}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {searches}
              <IconButton
                icon={ArrowRightUpLineIcon}
                onclick={() => goto("/account/history/searches")}
              />
            </Table.Cell>
            <Table.Cell>
              {additions}
              <IconButton
                icon={ArrowRightUpLineIcon}
                onclick={() => goto("/account/history/additions")}
              />
            </Table.Cell>
            <Table.Cell>
              {changes}
              <IconButton
                icon={ArrowRightUpLineIcon}
                onclick={() => goto("/account/history/changes")}
              />
            </Table.Cell>
            <Table.Cell>
              {timeSpentUsing.humanize()}
              <IconButton
                icon={ArrowRightUpLineIcon}
                onclick={() => goto("/account/history/time-spent-using")}
              />
            </Table.Cell>
            <Table.Cell>
              {timeSpentEditing.humanize()}
              <IconButton
                icon={ArrowRightUpLineIcon}
                onclick={() => goto("/account/history/time-spent-editing")}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </section>
    <section>
      <Button icon={ExitLineIcon} onclick={signOut}>
        {m["routes.account.logout"]()}
      </Button>
    </section>
  </Page.Root>
{:else}
  <Loading />
{/if}
