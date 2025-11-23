<script>
  import { clsx } from "clsx/lite";
  import SelectOption from "../select-option.svelte";

  const { option, selected, select } = $props();

  let classes;
  switch (option[1]) {
    case "red":
      classes = "bg-red-400";
      break;
    case "orange":
      classes = "bg-orange-400";
      break;
    case "amber":
      classes = "bg-amber-400";
      break;
    case "yellow":
      classes = "bg-yellow-400";
      break;
    case "lime":
      classes = "bg-lime-400";
      break;
    case "green":
      classes = "bg-green-400";
      break;
    case "emerald":
      classes = "bg-emerald-400";
      break;
    case "teal":
      classes = "bg-teal-400";
      break;
    case "cyan":
      classes = "bg-cyan-400";
      break;
    case "sky":
      classes = "bg-sky-400";
      break;
    case "blue":
      classes = "bg-blue-400";
      break;
    case "indigo":
      classes = "bg-indigo-400";
      break;
    case "violet":
      classes = "bg-violet-400";
      break;
    case "purple":
      classes = "bg-purple-400";
      break;
    case "fuchsia":
      classes = "bg-fuchsia-400";
      break;
    case "pink":
      classes = "bg-pink-400";
      break;
    case "rose":
      classes = "bg-rose-400";
      break;
    case "slate":
      classes = "bg-slate-400";
      break;
    case "gray":
      classes = "bg-gray-400";
      break;
    case "zinc":
      classes = "bg-zinc-400";
      break;
    case "neutral":
      classes = "bg-neutral-400";
      break;
    case "stone":
      classes = "bg-stone-400";
      break;
  }
</script>

<button
  type="button"
  onclick={() => select(option)}
  class={clsx(
    "rounded-lg p-2 font-medium text-sm cursor-pointer text-white",
    classes
  )}
>
  <section class="flex w-full">
    {option[0]}
  </section>
</button>
