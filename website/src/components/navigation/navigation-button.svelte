<script>
  const { title, highlighted, onclick } = $props();
</script>

<button
  class="text-xl font-bold"
  class:cursor-pointer={onclick}
  class:text-yellow-400={highlighted}
  class:text-zinc-400={!highlighted}
  class:hover:text-yellow-400={onclick && highlighted}
  class:hover:text-zinc-400={onclick && !highlighted}
  {onclick}
>
  {title}
</button>
