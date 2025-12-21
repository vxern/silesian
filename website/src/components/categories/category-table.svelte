<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";
  import ColourLabel from "../labels/colour-label.svelte";
  import { page } from "$app/stores";

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
        {m["components.category_table.description"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.category_table.colour"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.category_table.version"]()}
      </Table.HeaderCell>
      {#if hasPermission && categories.length > 0}
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
      <Table.Row id={category.id} {index}>
        {@const highlighted = $page.url.hash === `#${category.id}`}
        <Table.Cell {highlighted}>
          {category.name}
        </Table.Cell>
        <Table.Cell {highlighted}>
          {#if category.description}
            {category.description}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        <Table.Cell {highlighted}>
          <ColourLabel colour={category.colour} />
        </Table.Cell>
        <Table.Cell {highlighted}>
          {category.current_version}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell {highlighted} class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/categories/${category.id}/edit`)}
              />
              <!-- TODO(vxern): Ask the user if they're sure. -->
              <form
                method="POST"
                action="?/delete"
                class="flex flex-col gap-y-6"
              >
                <input type="hidden" name="id" value={category.id} />
                <Button colour="red" type="submit" icon={Delete2LineIcon} />
              </form>
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell {highlighted} class="justify-center">
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
