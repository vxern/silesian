<script>
  const { name, label, description } = $props();
</script>

<label for={name} class="flex flex-col items-start">
  <span class="text-xl text-zinc-300 font-bold">
    {label}
  </span>
  {#if description}
    <span class="text-xs text-zinc-400">
      {description}
    </span>
  {/if}
</label>
