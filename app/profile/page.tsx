import { redirect } from "next/navigation";
import { getSession } from "../lib";
import type { Metadata } from "next";
import Navbar from "../_components/navbar";

export const metadata: Metadata = {
	title: "Profile",
	description: "This is the profile page",
};

export default async function Profile() {
	const session = await getSession();
	if (session) {
		const { name, email, password } = session.user;
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
					<dl>
						<dt>Name:</dt>
						<dd>{name}</dd>
						<dt>Email:</dt>
						<dd>{email}</dd>
						<dt>Password:</dt>
						<dd>{password}</dd>
					</dl>
				</section>
			</>
		);
	} else {
		redirect("../login");
	}
}
