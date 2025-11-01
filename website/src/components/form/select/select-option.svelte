<script>
  const { highlighted, select, children } = $props();
</script>

<button
  type="button"
  onclick={() => select()}
  class="rounded-lg p-2 {highlighted
    ? 'bg-blue-600'
    : 'bg-zinc-700'} text-sm cursor-pointer"
>
  {@render children?.()}
</button>
