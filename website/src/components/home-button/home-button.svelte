<script>
  import { goto } from "$app/navigation";
  import constants from "$lib/constants";

  function navigateToHome() {
    goto("/");
  }
</script>

<button class="fixed top-8 left-8 cursor-pointer" onclick={navigateToHome}>
  <h1 class="text-3xl text-yellow-400 hover:text-yellow-300 font-bold">
    {constants.projectName}
  </h1>
</button>
