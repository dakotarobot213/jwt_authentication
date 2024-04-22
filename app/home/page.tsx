import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, logout } from "../lib";
import Navbar from "../_components/navbar";

export const metadata: Metadata = {
	title: "Home",
	description: "The home page, its only accessible when logged in",
};

export default async function Home() {
	const session = await getSession();
	if (session) {
		const { name, email, password } = session.user;
		return (
			<>
				<Navbar
					pages={[
						{ name: "Home", url: "/home" },
						{ name: "Login", url: "/login" },
						{ name: "Profile", url: "/profile" },
					]}
				/>
				<section>
					<dl>
						<dt>Name:</dt>
						<dd>{name}</dd>
						<dt>Email:</dt>
						<dd>{email}</dd>
						<dt>Password:</dt>
						<dd>{password}</dd>
					</dl>
					<form
						action={async (formdata) => {
							"use server";
							await logout();
							redirect("/");
						}}
					>
						<button type="submit">Logout</button>
						<pre>{session ? JSON.stringify(session, null, 2) : "No JWT detected"}</pre>
					</form>
				</section>
			</>
		);
	} else {
		redirect("../");
	}
}
