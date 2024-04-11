import { redirect } from 'next/navigation';
import { getSession, login, logout } from '../lib';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
	description: 'This is the profile page, I forgot what this did',
};

export default async function Profile() {
	const session = await getSession();
	if (session) {
		const { name, email, password } = session.user;
		return (
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
		);
	} else {
		redirect('../');
	}
}
