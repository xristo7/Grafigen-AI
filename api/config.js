import { sql } from './db.js';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const data = await sql`SELECT * FROM site_config ORDER BY updated_at DESC LIMIT 1`;
      return response.status(200).json(data[0]?.value || {});
    }

    if (request.method === 'POST') {
      const config = request.body;
      
      // Upsert configuration (assuming id=1 is the global config)
      await sql`
        INSERT INTO site_config (id, value, updated_at)
        VALUES (1, ${config}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET
          value = ${config},
          updated_at = CURRENT_TIMESTAMP
      `;
      
      return response.status(200).json({ success: true, message: 'Configuration saved to Neon' });
    }

    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database Error:', error);
    return response.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
