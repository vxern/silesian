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
  import ArrowRightUpLineIcon from "~icons/mingcute/arrow-right-up-line";
  import Table from "../layout/table/index.js";

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
    {#each sources as source, index}
      <Table.Row {index}>
        <Table.Cell>
          {#if source.url}
            <a href={source.url} class="underline underline-offset-3">
              {source.name}
            </a>
          {:else}
            {source.name}
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if source.authors === "community"}
            <i>
              {m["components.source_table.authors.community"]()}
            </i>
          {:else if source.authors.length > 0}
            <ul>
              {#each source.authors as author}
                <li>{author}</li>
              {/each}
            </ul>
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
          {#if !source.access}
            {m["meta.unknown"]()}
          {:else if source.access === "closed"}
            <span class="text-red-500">
              {m["accesses.closed"]()}
            </span>
          {:else if source.access === "limited"}
            <span class="text-yellow-500">
              {m["accesses.limited"]()}
            </span>
          {:else if source.access === "open"}
            <span class="text-green-500">
              {m["accesses.open"]()}
            </span>
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if !source.licence}
            {m["meta.unknown"]()}
          {:else if source.licence === "proprietary"}
            <span class="text-red-500">
              {m["licences.proprietary"]()}
            </span>
          {:else if source.licence === "granted"}
            <span class="text-green-500">
              {m["licences.granted"]()}
            </span>
          {:else if source.licence === "public"}
            <span class="text-green-500">
              {m["licences.public"]()}
            </span>
          {:else if source.redistributable}
            <span class="text-green-500">
              {source.licence}
            </span>
          {:else}
            <span class="text-yellow-500">
              {source.licence}
            </span>
          {/if}
        </Table.Cell>
        <Table.Cell>
          {#if source.redistributable}
            <section class="flex flex-col">
              {m["components.source_table.progress.numbers"]({
                imported: source.imported_entry_count,
                total: source.total_entry_count,
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
          {:else}
            {m["meta.unknown"]()}
          {/if}
        </Table.Cell>
        {#if hasPermission}
          {#if mode === "edit"}
            <Table.Cell class="justify-center">
              <Button
                colour="green"
                icon={Pencil2LineIcon}
                onclick={() => goto(`/sources/${source.id}/edit`)}
              />
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
