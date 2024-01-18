// next-auth.js
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { Account, Profile, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import { BASE_URL, DOMAIN_URL } from '@/lib/env';
interface User {
	username: string;
	user_status: string;
	token: string;
	role: string;
	is_subscription: string | null;
}

export default NextAuth({
	providers: [
		CredentialsProvider({
			credentials: {},
			authorize: async (credentials: any) => {
				let bodyData = {};
				if (credentials.from === 'login') {
					bodyData = {
						email: credentials.email,
						password: credentials.password,
					};
				} else {
					bodyData = {
						name: credentials.name,
						role: credentials.role,
						email: credentials.email,
						number: credentials.number,
						password: credentials.password,
					};
				}

				const res = await fetch(`${BASE_URL}/api/${credentials.from}`, {
					method: 'POST',
					body: JSON.stringify(bodyData),
					headers: {
						'Content-Type': 'application/json',
						'X-Requested-With': 'XMLHttpRequest',
					},
				});
				if (res.ok) {
					const user = await res.json();
					console.log(user);

					if (user.validation_errors) {
						throw new Error(JSON.stringify(user.validation_errors));
					} else if (user.status === 401) {
						throw new Error('Invalid credentials');
					} else if (user.status === 200 && !user.validation_errors) {
						return Promise.resolve(user);
					}
				} else {
					return Promise.resolve(null);
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},

	callbacks: {
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async jwt(params: {
			token: JWT;
			user: User | AdapterUser | any;
			account: Account | null;
			profile?: Profile | undefined;
			trigger?: 'signIn' | 'signUp' | 'update' | undefined;
			isNewUser?: boolean | undefined;
			session?: any;
		}) {
			const { token, user } = params; // Destructure the parameters
			if (user) {
				// Store user data in the JWT token
				token.username = user?.username;
				token.user_status = user?.user_status;
				token.token = user?.token;
				token.role = user?.role;
				token.message = user?.message;
				token.is_subscription = user?.is_subscription;
			}

			return token; // Return the modified token
		},
		async session(params: {
			session: Session; // Use the CustomSession type here
			token: JWT;
			user: any | User;
			newSession: any;
			trigger: 'update';
		}) {
			const { session, token, user } = params;
			// session.expires=30 * 24 * 60 * 60, // Expiration time (e.g., 30 days)
			// Attach user data to the session object

			session.user = {
				username: token.username,
				user_status: token.user_status,
				token: token.token,
				role: token.role,
				message: token.message,
				is_subscription: token.is_subscription,
			};

			return session;
		},
	},

	cookies: {
		sessionToken: {
			name: 'user_info',
			options: {
				domain: DOMAIN_URL,
				path: '/',
				httpOnly: false,
				sameSite: 'lax',
				secure: false,
				// maxAge: 60, for 1 minute
			},
		},
	},
	// Add other NextAuth.js options as needed
});
