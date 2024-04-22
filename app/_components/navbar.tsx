"use client";

import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

type Page = {
	name: string;
	url: string;
};

export default function Navbar({ pages }: { pages: Page[] }) {
	return (
		<nav className={styles.navbar}>
			<ul>
				{pages.map(({ name, url }) => (
					<li key={name}>
						<Link href={url}>{name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
