<script>
  import { clsx } from "clsx/lite";
  import { m } from "$lib/paraglide/messages";
  import { resolveTailwindColour } from "../../helpers/tailwind";

  const { colour } = $props();
</script>

<section
  class={clsx(
    "flex w-full rounded-lg p-2 font-medium text-sm text-white",
    resolveTailwindColour(colour)
  )}
>
  {m[`colours.${colour}`]()}
</section>
