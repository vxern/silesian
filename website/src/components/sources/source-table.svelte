<script>
  import { goto } from "$app/navigation";
  import { m } from "$lib/paraglide/messages";
  import {
    compareLicence,
    compareAccess,
    compareProgress,
    compareName,
    compareAuthors,
    completion,
  } from "../../helpers/sources.js";
  import Button from "../interactions/button.svelte";
  import Pencil2LineIcon from "~icons/mingcute/pencil-2-line";
  import Delete2LineIcon from "~icons/mingcute/delete-2-line";
  import IconButton from "../../components/interactions/icon-button.svelte";
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";
  import AuthorLabel from "../labels/author-label.svelte";
  import AccessLabel from "../labels/access-label.svelte";
  import LicenceLabel from "../labels/licence-label.svelte";

  // TODO(vxern): Ensure the user doesn't see the edit/review button unless they've got the permission to.
  // TODO(vxern): Update the check for community authors.

  const hasPermission = true;

  const { sources: unsortedSources, mode, noneText } = $props();

  const sources = unsortedSources
    .sort(
      (a, b) =>
        compareLicence(a.licence, b.licence) ||
        compareAccess(a.access, b.access) ||
        compareProgress(a, b) ||
        compareName(a.name, b.name) ||
        compareAuthors(a.authors, b.authors)
    )
    .reverse();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        {m["components.source_table.work"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.description"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.authors"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.year"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.access"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.licence"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.progress.progress"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.version"]()}
      </Table.HeaderCell>
      {#if hasPermission && sources.length > 0}
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
    {#each sources as source, index}
      <Table.Row {index}>
        <Table.Cell>
          {source.name}
          {#if source.url}
            <IconButton
              icon={ArrowRightUpLineIcon}
              onclick={() => (window.location.href = source.url)}
            />
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if source.description}
            {source.description}
          {:else}
            {m["meta.none"]()}
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if source.authors.length > 0}
            {#each source.authors as author}
              <AuthorLabel {author} />
            {/each}
          {:else}
            {m["meta.unknown"]()}
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if source.year}
            {source.year}
          {:else}
            {m["meta.unknown"]()}
          {/if}
        </Table.Cell>
        <Table.Cell>
          <AccessLabel access={source.access} />
        </Table.Cell>
        <Table.Cell>
          <LicenceLabel licence={source.licence} />
        </Table.Cell>
        <Table.Cell>
          <section class="flex flex-col">
            {m["components.source_table.progress.numbers"]({
              imported: source.imported_entry_count,
              total: source.total_entry_count ?? m["meta.unknown"](),
            })}
            {#snippet percentage()}
              {m["components.source_table.progress.percentage"]({
                percentage: (completion(source) * 100).toFixed(1),
              })}
            {/snippet}
            {#if completion(source) > 0.95}
              <span class="text-green-500">
                {@render percentage()}
              </span>
            {:else if completion(source) > 0.5}
              <span class="text-yellow-500">
                {@render percentage()}
              </span>
            {:else}
              <span class="text-red-500">
                {@render percentage()}
              </span>
            {/if}
          </section>
        </Table.Cell>
        <Table.Cell>
          {source.version}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/sources/${source.id}/edit`)}
              />
              <!-- TODO(vxern): Ask the user if they're sure. -->
              <form
                method="POST"
                action="?/delete"
                use:enhance
                class="flex flex-col gap-y-6"
              >
                <input type="hidden" name="id" value={source.id} />
                <Button colour="red" type="submit" icon={Delete2LineIcon} />
              </form>
            </Table.Cell>
          {/if}
          {#if mode === "review"}
            <Table.Cell class="justify-center">
              <Button
                colour="blue"
                icon={ArrowRightUpLineIcon}
                onclick={() => goto(`/sources/${source.id}/review`)}
              />
            </Table.Cell>
          {/if}
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
{#if sources.length === 0}
  {noneText}
{/if}
