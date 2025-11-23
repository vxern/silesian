<script>
  import { clsx } from "clsx/lite";
  import Loading from "../meta/loading.svelte";
  import Error from "../meta/error.svelte";

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
  <Error class={classes} />
{:else if !imageLoaded}
  <Loading class={classes} />
{/if}

<img
  class={clsx(classes, !imageLoaded && "hidden")}
  {...props}
  onload={onLoad}
  onerror={onError}
/>
