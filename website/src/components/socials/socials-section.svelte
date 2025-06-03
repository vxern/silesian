<script>
  import { goto } from "$app/navigation";
  import DiscordIcon from "~icons/mingcute/discord-line";
  import TwitterIcon from "~icons/mingcute/twitter-line";
  import InstagramIcon from "~icons/mingcute/instagram-line";
  import GitHubLineIcon from "~icons/mingcute/github-line";
</script>

<nav class="fixed bottom-8 right-8 flex gap-x-2 text-2xl text-zinc-500">
  <button class="cursor-pointer" onclick={() => goto("/social/discord")}>
    <DiscordIcon class="hover:text-[#5865F2]" />
  </button>
  <button class="cursor-pointer" onclick={() => goto("/social/twitter")}>
    <TwitterIcon class="hover:text-[#1DA1F2]" />
  </button>
  <button class="cursor-pointer" onclick={() => goto("/social/instagram")}>
    <InstagramIcon class="hover:text-[#DD2A7B]" />
  </button>
  <button class="cursor-pointer" onclick={() => goto("/social/github")}>
    <GitHubLineIcon class="hover:text-[#FFFFFF]" />
  </button>
</nav>
