<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";

  // TODO(vxern): Ensure the user doesn't see the edit/review button unless they've got the permission to.

  const hasPermission = true;

  const { locations, mode, noneText } = $props();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.location_table.name"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.location_table.version"]()}
      </Table.HeaderCell>
      {#if hasPermission && locations.length > 0}
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
    {#each locations as location, index}
      <Table.Row {index}>
        <Table.Cell>
          {location.name}
        </Table.Cell>
        <Table.Cell>
          {location.version}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/locations/${location.id}/edit`)}
              />
              <!-- TODO(vxern): Ask the user if they're sure. -->
              <form
                method="POST"
                action="?/delete"
                use:enhance
                class="flex flex-col gap-y-6"
              >
                <input type="hidden" name="id" value={location.id} />
                <Button colour="red" type="submit" icon={Delete2LineIcon} />
              </form>
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell class="justify-center">
              <Button
                colour="blue"
                icon={ArrowRightUpLineIcon}
                onclick={() => goto(`/locations/${location.id}/review`)}
              />
            </Table.Cell>
          {/if}
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if locations.length === 0}
  {noneText}
{/if}
