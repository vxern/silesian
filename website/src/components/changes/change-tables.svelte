<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import {
    Chart,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    PointElement,
  } from "chart.js";
  import Table from "../layout/table/index.js";
  import { dayjs } from "../../helpers/dates.js";
  import localeData from "dayjs/plugin/localeData";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import calendar from "dayjs/plugin/calendar";

  dayjs.extend(duration);
  dayjs.extend(localeData);
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);

  Chart.register([
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    PointElement,
  ]);

  const { changeCount, changeCountByMonth, changeHistory } = $props();

  function chart(element) {
    new Chart(element.getContext("2d"), {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: m["components.change_tables.chart.month"](),
            },
          },
          y: {
            ticks: {
              precision: 0,
            },
            title: {
              display: true,
              text: m["components.change_tables.chart.count"](),
            },
          },
        },
      },
      data: {
        labels: dayjs.localeData().months(),
        datasets: [
          {
            text: m["components.change_tables.chart.label"](),
            backgroundColor: "oklch(54.6% 0.245 262.881)", // color-blue-600
            data: Object.values(changeCountByMonth),
          },
        ],
      },
    });
  }
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.change_tables.chart.chart"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <section class="h-96 w-full bg-zinc-910">
          <canvas {@attach chart}></canvas>
        </section>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.change_tables.overview.count"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        {changeCount}
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.change_tables.history.lemma"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.change_tables.history.created_at"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each changeHistory as entry, index}
      <Table.Row {index}>
        <Table.Cell>
          <a
            class="font-bold underline"
            href="/lemma/{encodeURIComponent(entry.lemma)}#{entry.id}"
          >
            {entry.lemma}
          </a>
        </Table.Cell>
        <Table.Cell>
          {dayjs(entry.created_at).calendar()}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if changeHistory.length === 0}
  {m["components.change_tables.history.no_change_history"]()}
{/if}
