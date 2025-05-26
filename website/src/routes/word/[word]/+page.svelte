<script>
  import { m } from "$lib/paraglide/messages";
  import { page } from "$app/state";
</script>

<section class="w-full flex flex-col gap-y-12">
  <article>
    <h1 class="text-5xl">
      <span class="text-yellow-400">
        {m["word.results.exact"]()}
      </span>
      <span class="text-yellow-400">„</span>
      <span class="text-blue-500">
        {page.params.word}
      </span>
      <span class="text-yellow-400">”</span>
    </h1>
  </article>
  <article class="flex">
    <section class="w-full h-12 mx-2 rounded-lg bg-zinc-700"></section>
    <section class="w-full h-12 mx-2 rounded-lg bg-zinc-700"></section>
  </article>
</section>
