<script>
  import { clsx } from "clsx/lite";
  import Loading from "../meta/loading.svelte";
  import AlertLineIcon from "~icons/mingcute/alert-line";

  const { children, class: classes, ...props } = $props();

  let imageFailedToLoad = $state(false);
  function onError() {
    imageFailedToLoad = true;
  }

  let imageLoaded = $state(false);
  function onLoad() {
    imageLoaded = true;
  }
</script>

{#if imageFailedToLoad}
  <AlertLineIcon class="text-yellow-400" />
{:else if imageLoaded}
  <Loading />
{/if}

<img
  class={clsx(classes, !imageLoaded && "hidden")}
  {...props}
  onload={onLoad}
  onerror={onError}
/>
