<script>
  const { text, colour = "red" } = $props();
</script>

<section
  class="absolute top-[-0.5rem] right-[-0.5rem] text-sm rounded-full px-1 bg-{colour}-500 text-white inline-flex items-center justify-center"
>
  {text}
</section>
