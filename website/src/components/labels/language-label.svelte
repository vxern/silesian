<script>
  import { m } from "$lib/paraglide/messages";
  import { getFlag } from "../../helpers/language";
  import "flag-icons/css/flag-icons.min.css";

  const { locale } = $props();
</script>

<section
  class="flex w-full rounded-lg p-2 font-medium text-sm text-white gap-x-2 items-center bg-zinc-700"
>
  <span
    class="fi fi-{getFlag(locale)} rounded-xs text-base outline-1 outline-black"
  ></span>
  {m[`languages.${locale}`]()}
</section>
