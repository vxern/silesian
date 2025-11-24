<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Table from "../layout/table/index.js";
  import { dayjs } from "../../helpers/dates.js";
  import IconButton from "../../components/interactions/icon-button.svelte";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import duration from "dayjs/plugin/duration";
  import relativeTime from "dayjs/plugin/relativeTime";
  import calendar from "dayjs/plugin/calendar";

  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);

  const { searches, noneText } = $props();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.searches_table.lemma"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.searches_table.created_at"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each searches as search, index}
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
{#if searches.length === 0}
  {noneText}
{/if}
