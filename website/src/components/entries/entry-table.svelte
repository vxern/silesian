<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
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
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/entries/${entry.id}/edit`)}
              />
              <!-- TODO(vxern): Handle this properly. -->
              <Button
                colour="red"
                icon={Delete2LineIcon}
                onclick={() => goto(`/entries/${entry.id}/delete`)}
              />
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell class="justify-center">
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
