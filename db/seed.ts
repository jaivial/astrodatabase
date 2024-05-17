import { db, Visits } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Visits).values({
		page: 'home',
		pagination: 1,
		visitor_ip_hash: '30963a87dd481e4366237ed9cb37f001e24bcb865833be0036f7f081176b9812',
		visitor_user_agent_hash: 'c08ae1ccbe7296f4d6589acb026c5a0379bb07f1915cca8829d4cead13211e26',
		visitor_count: 10
	});
}