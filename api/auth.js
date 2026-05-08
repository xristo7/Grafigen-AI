import { sql } from './db.js';

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') {
      const { email, name, role } = request.body;
      
      // Upsert user (email is unique)
      const user = await sql`
        INSERT INTO users (email, name, role, last_login)
        VALUES (${email}, ${name}, ${role}, CURRENT_TIMESTAMP)
        ON CONFLICT (email) DO UPDATE SET
          name = ${name},
          role = ${role},
          last_login = CURRENT_TIMESTAMP
        RETURNING *
      `;
      
      return response.status(200).json(user[0]);
    }

    if (request.method === 'GET') {
      const users = await sql`SELECT * FROM users ORDER BY last_login DESC`;
      return response.status(200).json(users);
    }

    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Auth Error:', error);
    return response.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
