import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, login, logout } from "../lib";
import Navbar from "../_components/navbar";

export const metadata: Metadata = {
	title: "Login",
	description: "The one and only login page we have",
};

export default async function Login() {
	const session = await getSession();
	return (
		<>
			<Navbar
				pages={[
					{ name: "Home", url: "/" },
					{ name: "Login", url: "/login" },
					{ name: "Profile", url: "/profile" },
				]}
			/>

			<section>
				<form
					action={async (formdata) => {
						"use server";
						await login(formdata);
						redirect("/");
					}}
				>
					<input
						type="email"
						name="email"
						id="email"
					/>
					<input
						type="password"
						name="password"
						id="password"
					/>
					<input
						type="submit"
						name="submit"
						id="submit"
					/>
				</form>

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
}
