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
  import Table from "../layout/table/index.js";

  // TODO(vxern): Use proper permissions.
  const hasPermission = true;

  // TODO(vxern): Update the check for community authors.

  const { sources: unsortedSources } = $props();

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
        {m["components.source_table.authors.authors"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.access.access"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.licence.licence"]()}
      </Table.HeaderCell>
      <Table.HeaderCell>
        {m["components.source_table.progress.progress"]()}
      </Table.HeaderCell>
      {#if hasPermission && sources.length > 0}
        <Table.HeaderCell />
      {/if}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each sources as source}
      <Table.Row>
        <Table.HeaderCell scope="row" class="w-[35%]">
          {#if source.url}
            <a href={source.url} class="underline underline-offset-3">
              {source.name}
            </a>
          {:else}
            {source.name}
          {/if}
        </Table.HeaderCell>
        <Table.Cell class="w-[30%]">
          {#if source.authors === "community"}
            <i>
              {m["components.source_table.authors.community"]()}
            </i>
          {:else if source.authors.length > 0}
            {source.authors.join(" · ")}
          {:else}
            {m["meta.unknown"]()}
          {/if}
        </Table.Cell>
        <Table.Cell class="w-[10%]">
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
        <Table.Cell class="w-[15%]">
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
        <Table.Cell class="w-[10%]">
          {#if !source.redistributable}
            {m["meta.none"]()}
          {:else}
            {m["components.source_table.progress.numbers"]({
              imported: source.imported_entry_count,
              total: source.total_entry_count,
            })}
            <br />
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
          {/if}
        </Table.Cell>
        {#if hasPermission}
          <Table.Cell>
            <Button
              colour="green"
              icon={Pencil2LineIcon}
              onclick={() => goto(`/sources/${source.id}/edit`)}
            />
          </Table.Cell>
        {/if}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
