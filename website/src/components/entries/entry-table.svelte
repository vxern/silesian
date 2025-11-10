<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Table from "../layout/table/index.js";

  // TODO(vxern): Use proper permissions.
  const hasPermission = true;

  const { entries } = $props();
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
      {#if hasPermission && entries.length > 0}
        <Table.HeaderCell />
      {/if}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each entries as entry}
      <Table.Row>
        <Table.HeaderCell scope="row">
          {entry.lemma}
        </Table.HeaderCell>
        <Table.Cell>
          <a href={entry.source.url} class="underline underline-offset-3">
            {entry.source.name}
          </a>
        </Table.Cell>
        {#if hasPermission}
          <Table.Cell>
            <Button
              colour="green"
              icon={Pencil2LineIcon}
              onclick={() => goto(`/entries/${entry.id}/edit`)}
            />
          </Table.Cell>
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
