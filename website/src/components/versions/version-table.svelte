<script>
  import Table from "../layout/table/index.js";
  import { m } from "$lib/paraglide/messages";
  import { dayjs } from "../../helpers/dates.js";
  import calendar from "dayjs/plugin/calendar";
  import relativeTime from "dayjs/plugin/relativeTime";
  import AccessLabel from "../../components/labels/access-label.svelte";
  import AuthorLabel from "../../components/labels/author-label.svelte";
  import CategoryLabel from "../../components/labels/category-label.svelte";
  import ColourLabel from "../../components/labels/colour-label.svelte";
  import CountryLabel from "../../components/labels/country-label.svelte";
  import LanguageLabel from "../../components/labels/language-label.svelte";
  import LicenceLabel from "../../components/labels/licence-label.svelte";
  import LocationLabel from "../../components/labels/location-label.svelte";
  import OrthographyLabel from "../../components/labels/orthography-label.svelte";
  import SourceLabel from "../../components/labels/source-label.svelte";
  import BooleanLabel from "../labels/boolean-label.svelte";

  dayjs.extend(relativeTime);
  dayjs.extend(calendar);

  const { versions, types, translateProperty } = $props();

  function getChanges(versions) {
    const changeHistory = {};
    for (const version of versions.toReversed()) {
      for (const [property, value] of Object.entries(version.snapshot ?? {})) {
        if (!(property in changeHistory)) {
          changeHistory[property] = [];
        }

        changeHistory[property].push(value);
      }
    }

    return changeHistory;
  }

  const changeHistory = getChanges(versions);
</script>

{#snippet formatValue({ type, value })}
  {#if type === "access"}
    <AccessLabel access={value} />
  {:else if type === "author"}
    <AuthorLabel author={value} />
  {:else if type === "category"}
    <CategoryLabel category={value} />
  {:else if type === "colour"}
    <ColourLabel colour={value} />
  {:else if type === "country"}
    <CountryLabel country={value} />
  {:else if type === "language"}
    <LanguageLabel locale={value} />
  {:else if type === "licence"}
    <LicenceLabel licence={value} />
  {:else if type === "location"}
    <LocationLabel location={value} />
  {:else if type === "orthography"}
    <OrthographyLabel orthography={value} />
  {:else if type === "source"}
    <SourceLabel source={value} />
  {:else if typeof value === "boolean"}
    <BooleanLabel {value} />
  {:else}
    {value}
  {/if}
{/snippet}

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell rowspan="2">
        {m["components.version_table.version"]()}
      </Table.HeaderCell>
      <Table.HeaderCell colspan="3">
        {m["components.version_table.snapshot"]()}
      </Table.HeaderCell>
      <Table.HeaderCell rowspan="2">
        {m["components.version_table.author_id"]()}
      </Table.HeaderCell>
      <Table.HeaderCell rowspan="2">
        {m["components.version_table.created_at"]()}
      </Table.HeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.HeaderCell class="border-yellow-400 text-yellow-400 w-1/3">
        {m["components.version_table.field"]()}
      </Table.HeaderCell>
      <Table.HeaderCell class="border-yellow-400 text-yellow-400 w-1/3">
        {m["components.version_table.before"]()}
      </Table.HeaderCell>
      <Table.HeaderCell class="border-yellow-400 text-yellow-400 w-1/3">
        {m["components.version_table.after"]()}
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each versions as version, index}
      {@const rowspan = version.snapshot
        ? Object.keys(version.snapshot).length
        : 1}
      {#snippet row(property)}
        {@const newValue = changeHistory[property].pop()}
        {@const oldValue = changeHistory[property].at(-1)}
        <Table.Cell class="text-nowrap">
          {translateProperty(property)}
        </Table.Cell>
        <Table.Cell>
          {#if oldValue != null}
            {@render formatValue({ type: types[property], value: oldValue })}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if newValue != null}
            {@render formatValue({ type: types[property], value: newValue })}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
      {/snippet}
      <Table.Row index={index + 1}>
        <Table.Cell {rowspan}>
          {version.version}
          {#if index === 0}
            <span>{m["components.version_table.divider"]()}</span>
            <span class="text-green-500 font-bold">
              {m["components.version_table.current"]()}
            </span>
          {/if}
        </Table.Cell>
        {#if version.snapshot}
          {@render row(Object.keys(version.snapshot).at(0))}
        {:else}
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        {/if}
        <Table.Cell {rowspan}>
          <!-- TODO(vxern): Use label. -->
          {version.author.username}
        </Table.Cell>
        <Table.Cell {rowspan}>
          {dayjs(version.created_at).calendar()}
        </Table.Cell>
      </Table.Row>
      {#if version.snapshot}
        {#each Object.keys(version.snapshot).slice(1) as property}
          <Table.Row index={index + 1}>
            {@render row(property)}
          </Table.Row>
        {/each}
      {/if}
    {/each}
  </Table.Body>
</Table.Root>
