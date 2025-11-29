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

  const hasPermission = true;

  const { authors, mode, noneText } = $props();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.author_table.name"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.author_table.locations"]()}
      </Table.HeaderCell>
      {#if hasPermission && authors.length > 0}
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
    {#each authors as author, index}
      <Table.Row {index}>
        <Table.Cell>
          {author.name}
        </Table.Cell>
        <Table.Cell>
          {#if author.locations && author.locations.length > 0}
            <ul>
              {#each source.locations as location}
                <li>{location}</li>
              {/each}
            </ul>
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/authors/${category.id}/edit`)}
              />
              <!-- TODO(vxern): Handle this properly. -->
              <Button
                colour="red"
                icon={Delete2LineIcon}
                onclick={() => goto(`/authors/${entry.id}/delete`)}
              />
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell class="justify-center">
              <Button
                colour="blue"
                icon={ArrowRightUpLineIcon}
                onclick={() => goto(`/authors/${category.id}/review`)}
              />
            </Table.Cell>
          {/if}
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if authors.length === 0}
  {noneText}
{/if}
