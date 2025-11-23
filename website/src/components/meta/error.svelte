<script>
  import { clsx } from "clsx/lite";
  import AlertLineIcon from "~icons/mingcute/alert-line";

  // TODO(vxern): Add a tooltip.

  const { class: classes } = $props();
</script>

<AlertLineIcon class={clsx("text-yellow-400", classes)} />
