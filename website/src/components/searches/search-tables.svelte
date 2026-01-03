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
  import IconButton from "../interactions/icon-button.svelte";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import calendar from "dayjs/plugin/calendar";
  import Loading from "../meta/loading.svelte";

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

  const { searchCount, searchCountByMonth, searchHistory } = $props();

  function chart(element) {
    new Chart(element.getContext("2d"), {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: m["components.search_tables.chart.month"](),
            },
          },
          y: {
            ticks: {
              precision: 0,
            },
            title: {
              display: true,
              text: m["components.search_tables.chart.count"](),
            },
          },
        },
      },
      data: {
        labels: dayjs.localeData().months(),
        datasets: [
          {
            label: m["components.search_tables.chart.label"](),
            backgroundColor: "oklch(54.6% 0.245 262.881)", // color-blue-600
            data: Object.values(searchCountByMonth),
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
        {m["components.search_tables.chart.chart"]()}
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
        {m["components.search_tables.overview.count"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        {searchCount}
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.search_tables.history.lemma"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.search_tables.history.created_at"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each searchHistory as search, index}
      <Table.Row {index}>
        <Table.Cell>
          <a
            class="font-bold underline"
            href="/lemma/{encodeURIComponent(search.lemma)}"
          >
            {search.lemma}
          </a>
        </Table.Cell>
        <Table.Cell>
          {dayjs(search.created_at).calendar()}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if searchHistory.length === 0}
  {m["components.search_tables.history.no_search_history"]()}
{/if}
