<script>
  import { beforeNavigate } from "$app/navigation";
  // TODO(vxern): What is enhance for again?
  import { enhance } from "$app/forms";

  const { children, enhance: enhancement, ...props } = $props();

  // TODO(vxern): Need to be smart about when the user should be prevented from leaving.

  // function handleBeforeUnload(event) {
  //   event.preventDefault();

  //   return true;
  // }

  // beforeNavigate(({ cancel }) => {
  //   cancel();
  // });
</script>

<svelte:window onbeforeunload={handleBeforeUnload} />

<form {...props} use:enhance={enhancement} class="flex flex-col gap-y-6">
  {@render children?.()}
</form>
