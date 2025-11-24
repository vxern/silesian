<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Table from "../layout/table/index.js";
  import { dayjs } from "../../helpers/dates.js";
  import IconButton from "../interactions/icon-button.svelte";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import calendar from "dayjs/plugin/calendar";

  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);

  const { searchCount, searchHistory } = $props();
</script>

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
          {search.lemma}
          <IconButton
            icon={ArrowRightUpLineIcon}
            onclick={() => goto(`/lemma/${encodeURIComponent(search.lemma)}`)}
          />
        </Table.Cell>
        <Table.Cell>
          {dayjs(search.created_at).calendar()}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if searchHistory.length === 0}
  {m["components.search_tables.no_search_history"]()}
{/if}
