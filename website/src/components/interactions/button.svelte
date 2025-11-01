<script>
  const {
    icon: Icon,
    colour = "blue",
    type = "button",
    children,
    ...props
  } = $props();
</script>

<button
  class="cursor-pointer flex items-center gap-x-1 outline-1 outline-{colour}-500 bg-{colour}-700 hover:bg-{colour}-600 text-{colour}-200 hover:text-{colour}-100 rounded-lg text-md font-bold p-2"
  {type}
  {...props}
>
  {#if Icon}
    <Icon />
  {/if}
  {@render children?.()}
</button>
