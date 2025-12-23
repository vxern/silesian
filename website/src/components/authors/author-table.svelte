<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";
  import LocationLabel from "../labels/location-label.svelte";
  import { page } from "$app/stores";

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
      {#if mode !== "edit"}
        <Table.HeaderCell>
          {m["components.author_table.version"]()}
        </Table.HeaderCell>
      {/if}
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
      <Table.Row id={author.id} {index}>
        {@const highlighted = $page.url.hash === `#${author.id}`}
        <Table.Cell {highlighted}>
          {author.name}
        </Table.Cell>
        <Table.Cell {highlighted}>
          {#if author.locations && author.locations.length > 0}
            {#each author.locations as location}
              <LocationLabel {location} />
            {/each}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        {#if mode !== "edit"}
          <Table.Cell {highlighted}>
            {author.current_version}
          </Table.Cell>
        {/if}
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell {highlighted} class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                tooltipMessage={m["components.interactions.button.edit"]()}
                tooltipTheme="edit"
                onclick={() => goto(`/authors/${author.id}/edit`)}
              />
              <!-- TODO(vxern): Ask the user if they're sure. -->
              <form
                method="POST"
                action="?/delete"
                class="flex flex-col gap-y-6"
              >
                <input type="hidden" name="id" value={author.id} />
                <Button
                  colour="red"
                  type="submit"
                  tooltipMessage={m["components.interactions.button.delete"]()}
                  tooltipTheme="delete"
                  icon={Delete2LineIcon}
                />
              </form>
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell {highlighted} class="justify-center">
              <Button
                colour="blue"
                icon={ArrowRightUpLineIcon}
                tooltipMessage={m["components.interactions.button.review"]()}
                tooltipTheme="review"
                onclick={() => goto(`/authors/${author.id}/review`)}
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
