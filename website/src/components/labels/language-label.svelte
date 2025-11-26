<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";
  import { getFlag } from "../../helpers/language";
  import "flag-icons/css/flag-icons.min.css";

  const { locale } = $props();
</script>

<Label class="bg-zinc-700">
  <span
    class="fi fi-{getFlag(locale)} rounded-xs text-base outline-1 outline-black"
  ></span>
  {m[`languages.${locale}`]()}
</Label>
