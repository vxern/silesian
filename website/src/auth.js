import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import GitHub from "@auth/sveltekit/providers/github";
import Google from "@auth/sveltekit/providers/google";
import LinkedIn from "@auth/sveltekit/providers/linkedin";
import Twitter from "@auth/sveltekit/providers/twitter";

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Discord(), GitHub(), Google(), LinkedIn(), Twitter()],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 365, // 1 year
	},
	trustHost: true,
	pages: {
		signIn: "/login",
		signOut: "/logout",
	},
});
