<script>
  import { m } from "$lib/paraglide/messages";
  import {
    compareLicence,
    compareAccess,
    compareProgress,
    compareName,
    compareAuthors,
    completion,
  } from "../../helpers/sources.js";
  import sources_ from "$lib/constants/sources";

  const sources = Object.values(sources_)
    .sort(
      (a, b) =>
        compareLicence(a.licence, b.licence) ||
        compareAccess(a.access, b.access) ||
        compareProgress(a.progress, b.progress) ||
        compareName(a.name, b.name) ||
        compareAuthors(a.authors, b.authors)
    )
    .reverse();
</script>

<table class="border-separate border-spacing-1 text-left">
  <thead class="text-blue-500">
    <tr>
      <th scope="col" class="border-b-1 border-b-zinc-700">
        {m["routes.sources.table.work"]()}
      </th>
      <th scope="col" class="border-b-1 border-b-zinc-700">
        {m["routes.sources.table.authors.authors"]()}
      </th>
      <th scope="col" class="border-b-1 border-b-zinc-700">
        {m["routes.sources.table.access.access"]()}
      </th>
      <th scope="col" class="border-b-1 border-b-zinc-700">
        {m["routes.sources.table.licence.licence"]()}
      </th>
      <th scope="col" class="border-b-1 border-b-zinc-700">
        {m["routes.sources.table.progress.progress"]()}
      </th>
    </tr>
  </thead>
  <tbody>
    {#each sources as source}
      <tr>
        <th scope="row" class="w-[35%] border-b-1 border-b-zinc-800">
          {#if !source.name}
            {m["meta.unknown"]()}
          {:else if source.link}
            <a href={source.link} class="underline underline-offset-3">
              {source.name}
            </a>
          {:else}
            {source.name}
          {/if}
        </th>
        <td class="w-[30%] border-b-1 border-b-zinc-800">
          {#if !source.authors}
            {m["meta.unknown"]()}
          {:else if source.authors === "community"}
            <i>
              {m["routes.sources.table.authors.community"]()}
            </i>
          {:else if source.authors.length > 0}
            {source.authors.join(" · ")}
          {:else}
            {m["meta.unknown"]()}
          {/if}
        </td>
        <td class="w-[10%] border-b-1 border-b-zinc-800">
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
        </td>
        <td class="w-[15%] border-b-1 border-b-zinc-800">
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
        </td>
        <td class="w-[10%] border-b-1 border-b-zinc-800">
          {#if !source.redistributable}
            {m["meta.none"]()}
          {:else if !source.progress}
            {m["meta.unknown"]()}
          {:else}
            {m["routes.sources.table.progress.numbers"]({
              imported: source.progress.imported ?? m["meta.unknown"](),
              total: source.progress.total ?? m["meta.unknown"](),
            })}
            <br />
            {#snippet percentage()}
              {m["routes.sources.table.progress.percentage"]({
                percentage: (completion(source.progress) * 100).toFixed(1),
              })}
            {/snippet}
            {#if source.progress.imported === undefined || source.progress.total === undefined}
              {m["routes.sources.table.progress.percentage"]({
                percentage: m["meta.unknown"](),
              })}
            {:else if completion(source.progress) > 0.95}
              <span class="text-green-500">
                {@render percentage()}
              </span>
            {:else if completion(source.progress) > 0.5}
              <span class="text-yellow-500">
                {@render percentage()}
              </span>
            {:else}
              <span class="text-red-500">
                {@render percentage()}
              </span>
            {/if}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
