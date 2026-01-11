<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../components/page/index.js";
  import NavigationSection from "../../../components/navigation/navigation-section.svelte";
  import AddLineIcon from "~icons/mingcute/add-line";
  import ChecksLineIcon from "~icons/mingcute/checks-line";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import TimeLineIcon from "~icons/mingcute/time-line";
  import Search2LineIcon from "~icons/mingcute/search-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import { dayjs } from "../../../helpers/dates.js";
  import constants from "$lib/constants/core";
  import { goto } from "$app/navigation";
  import BackButton from "../../../components/interactions/back-button.svelte";
  import Table from "../../../components/layout/table/index.js";
  import calendar from "dayjs/plugin/calendar";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(calendar);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.account.statistics.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.account.statistics.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.account.statistics.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/account")} />
    </Page.Actions>
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
          <Table.HeaderCell icon={ChecksLineIcon}>
            {m["routes.account.attributes.stats.reviews"]()}
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
            <a class="font-bold underline" href="/account/history/searches">
              {data.user.searches_count}
            </a>
          </Table.Cell>
          <Table.Cell>
            <a class="font-bold underline" href="/account/history/additions">
              {data.user.additions_count}
            </a>
          </Table.Cell>
          <Table.Cell>
            <a class="font-bold underline" href="/account/history/changes">
              {data.user.changes_count}
            </a>
          </Table.Cell>
          <Table.Cell>
            <a class="font-bold underline" href="/account/history/reviews">
              {data.user.reviews_count}
            </a>
          </Table.Cell>
          <Table.Cell>
            <a
              class="font-bold underline"
              href="/account/history/time-spent-using"
            >
              {dayjs.duration(data.user.time_spent_using).humanize()}
            </a>
          </Table.Cell>
          <Table.Cell>
            <a
              class="font-bold underline"
              href="/account/history/time-spent-editing"
            >
              {dayjs.duration(data.user.time_spent_editing).humanize()}
            </a>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </Page.Contents>
</Page.Root>
