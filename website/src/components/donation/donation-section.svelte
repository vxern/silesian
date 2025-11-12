<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";

  // TODO(vxern): Make dynamic.
  const progress = 34;
  const goal = "new_licence";
</script>

<nav
  class="fixed bottom-8 w-full flex flex-col gap-y-0.5 items-center cursor-pointer group"
  onclick={() => goto("/contribute/donation")}
>
  <span class="text-sm text-green-600 group-hover:text-green-500 italic">
    {m[`donation.goals.${goal}`]()}
  </span>
  <section class="w-1/4 bg-zinc-800 group-hover:bg-zinc-700 rounded-full">
    <section
      class="bg-green-700 group-hover:bg-green-600 text-white text-sm font-bold rounded-full"
      style="width: {progress}%"
    >
      {m["donation.progress"]({ progress })}
    </section>
  </section>
</nav>
