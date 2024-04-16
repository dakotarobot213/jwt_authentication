"use client";

import React from "react";
import Link from "next/link";

type Page = {
	name: string;
	url: string;
};

export default function Navbar({ pages }: { pages: Page[] }) {
	return (
		<nav className="navbar">
			<ul>
				{pages.map(({ name, url }) => (
					<Link href={url}>{name}</Link>
				))}
			</ul>
		</nav>
	);
}
