<script>
  import { goto } from "$app/navigation";
  import DiscordLineIcon from "~icons/mingcute/discord-line";
  import SocialXLineIcon from "~icons/mingcute/social-x-line";
  import InstagramLineIcon from "~icons/mingcute/instagram-line";
  import GitHubLineIcon from "~icons/mingcute/github-line";
</script>

<nav class="fixed bottom-8 left-8 flex gap-x-2 text-2xl text-zinc-500">
  <button class="cursor-pointer" onclick={() => goto("/socials/discord")}>
    <DiscordLineIcon class="hover:text-[#5865F2]" />
  </button>
  <button class="cursor-pointer" onclick={() => goto("/socials/x")}>
    <SocialXLineIcon class="hover:text-white" />
  </button>
  <button class="cursor-pointer" onclick={() => goto("/socials/instagram")}>
    <InstagramLineIcon class="hover:text-[#DD2A7B]" />
  </button>
  <button class="cursor-pointer" onclick={() => goto("/socials/github")}>
    <GitHubLineIcon class="hover:text-white" />
  </button>
</nav>
