<script>
  import Label from "./label.svelte";
  import { m } from "$lib/paraglide/messages";
  import { getFlag } from "../../helpers/country";
  import "flag-icons/css/flag-icons.min.css";

  const { country } = $props();
</script>

<Label class="bg-zinc-700">
  <span
    class="fi fi-{getFlag(
      country
    )} rounded-xs text-base outline-1 outline-black"
  ></span>
  {m[`countries.${country}`]()}
</Label>
