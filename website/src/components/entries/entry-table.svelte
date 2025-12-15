<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import ArrowLeftLineIcon from "~icons/mingcute/arrow-left-line";
  import Table from "../layout/table/index.js";
  import SourceLabel from "../labels/source-label.svelte";
  import CategoryLabel from "../labels/category-label.svelte";

  // TODO(vxern): Use proper permissions.
  const hasPermission = true;

  const { entries, mode, noneText } = $props();

  // TODO(vxern): Add more columns.
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.entry_table.lemma"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.entry_table.normalised_lemma"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.entry_table.source"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.entry_table.categories"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.entry_table.version"]()}
      </Table.HeaderCell>
      {#if hasPermission && entries.length > 0}
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
          {#if entry.normalised_lemma}
            {#if entry.lemma !== entry.normalised_lemma}
              <span class="text-green-400">
                {entry.normalised_lemma}
              </span>
            {:else}
              {entry.normalised_lemma}
            {/if}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        <Table.Cell>
          <SourceLabel source={entry.source} />
        </Table.Cell>
        <Table.Cell>
          {#if entry.categories.length > 0}
            {#each entry.categories as category}
              <CategoryLabel {category} />
            {/each}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        <Table.Cell>
          {entry.version}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/entries/${entry.id}/edit`)}
              />
              <!-- TODO(vxern): Ask the user if they're sure. -->
              <form
                method="POST"
                action="?/delete"
                class="flex flex-col gap-y-6"
              >
                <input type="hidden" name="id" value={entry.id} />
                <Button colour="red" type="submit" icon={Delete2LineIcon} />
              </form>
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
