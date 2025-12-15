<script>
  import { m } from "$lib/paraglide/messages";

  const { name, label, description, required = false } = $props();
</script>

<label for={name} class="flex flex-col text-start items-start">
  {#if required}
    <span>
      <span class="text-xl text-zinc-300 font-bold">
        {label}
      </span>
      <span class="text-xl text-blue-500 font-bold">
        {m["meta.required_field"]()}
      </span>
    </span>
  {:else}
    <span class="text-xl text-zinc-300 font-bold">
      {label}
    </span>
  {/if}
  {#if description}
    <span class="text-xs text-zinc-400">
      {description}
    </span>
  {/if}
</label>
