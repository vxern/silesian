<script>
  const { name, label, placeholder, ...props } = $props();
</script>

<section class="flex-1 flex flex-col gap-y-1 items-start">
  <label for={name} class="pl-1 text-xl text-blue-500">
    {label}
  </label>
  <input
    {name}
    {...props}
    {placeholder}
    class="flex-1 bg-zinc-800 outline-1 outline-zinc-600 text-zinc-300 placeholder:text-zinc-500 p-3 w-full rounded-lg"
  />
</section>
