<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Table from "../layout/table/index.js";

  // TODO(vxern): Use proper permissions.
  const hasPermission = true;

  const { entries, mode, noneText } = $props();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.entry_table.lemma"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.entry_table.source"]()}
      </Table.HeaderCell>
      {#if hasPermission}
        {#if mode === "edit"}
          <Table.HeaderCell />
        {/if}
        {#if mode === "review"}
          <Table.HeaderCell />
        {/if}
      {/if}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each entries as entry}
      <Table.Row>
        <Table.Cell>
          {entry.lemma}
        </Table.Cell>
        <Table.Cell>
          <a href={entry.source.url} class="underline underline-offset-3">
            {entry.source.name}
          </a>
        </Table.Cell>
        {#if mode === "edit"}
          <Table.Cell>
            <Button
              colour="green"
              icon={Pencil2LineIcon}
              onclick={() => goto(`/sources/${source.id}/edit`)}
            />
          </Table.Cell>
        {/if}
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell>
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/entries/${entry.id}/edit`)}
              />
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell>
              <Button
                colour="blue"
                icon={ArrowRightUpLineIcon}
                onclick={() => goto(`/entries/${entry.id}/review`)}
              />
            </Table.Cell>
          {/if}
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if entries.length === 0}
  {noneText}
{/if}
