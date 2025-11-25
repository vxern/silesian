<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";
  import ColourLabel from "../labels/colour-label.svelte";

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
          <ColourLabel colour={category.colour} />
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/categories/${category.id}/edit`)}
              />
              <!-- TODO(vxern): Handle this properly. -->
              <Button
                colour="red"
                icon={Delete2LineIcon}
                onclick={() => goto(`/categories/${entry.id}/delete`)}
              />
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell class="justify-center">
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
