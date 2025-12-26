import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import GitHub from "@auth/sveltekit/providers/github";
import Google from "@auth/sveltekit/providers/google";
import LinkedIn from "@auth/sveltekit/providers/linkedin";
import Twitter from "@auth/sveltekit/providers/twitter";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "$lib/database.server";
import { authAccounts } from "./lib/database/tables/auth/accounts";
import { authAuthenticators } from "./lib/database/tables/auth/authenticators"; 
import { authSessions } from "./lib/database/tables/auth/sessions";
import { authUsers } from "./lib/database/tables/auth/users";
import { authVerificationTokens } from "./lib/database/tables/auth/verification-tokens";

export const { handle, signIn, signOut } = SvelteKitAuth({
  	adapter: DrizzleAdapter(db, {
		accountsTable: authAccounts,
		authenticatorsTable: authAuthenticators,
		sessionsTable: authSessions,
		usersTable: authUsers,
		verificationTokensTable: authVerificationTokens,
	}),
	providers: [Discord(), GitHub(), Google(), LinkedIn(), Twitter()],
	callbacks: {
		session({ session }) {
			session.user.id = user?.id;

			return session;
		},
	},
	trustHost: true,
	pages: {
		signIn: "/login",
		signOut: "/logout",
	},
});
