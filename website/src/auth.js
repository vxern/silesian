import { SvelteKitAuth } from "@auth/sveltekit"
import Discord from "@auth/sveltekit/providers/discord"
import GitHub from "@auth/sveltekit/providers/github"
import Google from "@auth/sveltekit/providers/google"
import LinkedIn from "@auth/sveltekit/providers/linkedin"
import Twitter from "@auth/sveltekit/providers/twitter"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Discord(), GitHub(), Google(), LinkedIn(), Twitter()],
  trustHost: true,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
});
