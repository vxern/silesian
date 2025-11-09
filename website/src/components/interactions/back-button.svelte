<script>
  import ArrowLeftLineIcon from "~icons/mingcute/arrow-left-line";
  import Button from "./button.svelte";
  import { m } from "$lib/paraglide/messages";

  const {
    icon = ArrowLeftLineIcon,
    colour = "grey",
    text = m["components.back_button.back"](),
    ...props
  } = $props();
</script>

<Button {icon} {colour} {...props}>
  {text}
</Button>
