// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getArtist() {
  // Query the database and return all resource ones
  const queryText = "SELECT * FROM artists";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getArtistById(id) {
  // Query the database and return the resource with a matching id or null
  const queryText = "SELECT * FROM artists WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createArtist(artist) {
  // Query the database to create an resource and return the newly created resource
  const queryText = "INSERT INTO artists (name) VALUES ($1) RETURNING *";
  const result = await pool.query(queryText, [artist.name]);
  return result.rows[0];
}

export async function updateArtistById(id, updates) {
  // Query the database to update the resource and return the newly updated resource or null
  const queryText = "UPDATE artists SET name = $1 WHERE id = $2 RETURNING *";
  const result = await pool.query(queryText, [updates.name,id]);
  return result.rows[0] || null;
}

export async function deleteArtistById(id) {
  // Query the database to delete the resource and return the deleted resource or null
  const queryText = "DELETE FROM artists WHERE id = $1 RETURNING *"
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}
