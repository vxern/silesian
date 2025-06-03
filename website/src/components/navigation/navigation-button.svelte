<script>
  const { children, highlighted, onclick } = $props();

  // TODO(vxern): Fix the classes.
</script>

<button
  class="flex gap-x-2 items-center font-bold text-xl"
  class:cursor-pointer={onclick}
  class:text-yellow-400={highlighted}
  class:text-zinc-400={!highlighted}
  class:[hover:text-yellow-300]={!!onclick && highlighted}
  class:[hover:text-zinc-300]={onclick && !highlighted}
  {onclick}
>
  {@render children?.()}
</button>
