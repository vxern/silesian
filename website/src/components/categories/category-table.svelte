<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";

  // TODO(vxern): Ensure the user doesn't see the edit/review button unless they've got the permission to.
  // TODO(vxern): Update the check for community authors.

  const hasPermission = true;

  const { categories, mode, noneText } = $props();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.category_table.name"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.category_table.colour"]()}
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
    {#each categories as category, index}
      <Table.Row {index}>
        <Table.Cell>
          {category.name}
        </Table.Cell>
        <Table.Cell>
          <!-- TODO(vxern): Maybe get rid of this column and display it differently. -->
          {category.colour}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell>
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/categories/${category.id}/edit`)}
              />
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell>
              <Button
                colour="blue"
                icon={ArrowRightUpLineIcon}
                onclick={() => goto(`/categories/${category.id}/review`)}
              />
            </Table.Cell>
          {/if}
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if categories.length === 0}
  {noneText}
{/if}
