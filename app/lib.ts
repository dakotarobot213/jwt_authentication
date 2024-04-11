import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Make your secret
const secretKey = process.env.SECRET_KEY || "secret";
const key = new TextEncoder().encode(secretKey);

// How long until our token expires (in seconds)
const timeout: number = parseInt(process.env.TIMEOUT_SEC || "10");

// Encrypt your data
export async function encrypt(payload: any) {
	return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(`${timeout} sec`).sign(key);
}

// Decrypt your data
export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
	return payload;
}

export async function login(formData: FormData) {
	// Get the user and verify with master (configured via env, backup values incldued)
	const master = { email: process.env.EMAIL || "test@mail.com", password: process.env.PASSWORD || "password" };
	const user = { email: formData.get("email"), password: formData.get("password"), name: process.env.NAME || "Jimmy John" };
	// Verify user matches master, else do nothing
	if (master["email"] === user["email"] && master["password"] === user["password"]) {
		// Create the session
		const expires = new Date(Date.now() + timeout * 1000);
		const session = await encrypt({ user, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });
	}
}

export async function logout() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
	// Pulls session from cookies
	const session = cookies().get("session")?.value;
	// If the session doesn't exist, return null
	if (!session) return null;
	// If the session does exist, decrypt the session and return the results
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return;

	// Refresh the session so it doesn't expire
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + timeout * 1000);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}
