import { redirect } from "next/navigation";
import { getSession, login, logout } from "./lib";
import Navbar from "./_components/navbar";

export default async function Home() {
	const session = await getSession();
	if (session) {
		return (
			<>
				<section>
					<Navbar
						pages={[
							{ name: "Home", url: "/" },
							{ name: "Login", url: "/login" },
							{ name: "Profile", url: "/profile" },
						]}
					/>
					<pre>{session ? JSON.stringify(session, null, 2) : "No JWT detected"}</pre>
				</section>
			</>
		);
	} else {
		redirect("/login");
	}
}
