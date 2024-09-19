// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAlbum() {
  // Query the database and return all albums
  const queryText = "SELECT * FROM albums";
  const result = await pool.query(queryText);
  return result.rows;
}

export async function getAlbumById(id) {
  // Query the database and return the albums with a matching id or null
  const queryText = "SELECT * FROM albums WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createAlbum(album) {
  // Query the database to create an album and return the newly created album
  const queryText =
    "INSERT INTO albums (title, published_date, artist_id) VALUES ($1, $2, $3) RETURNING *";
  const result = await pool.query(queryText, [
    album.title,
    album.published_date,
    album.artist_id,
  ]);
  return result.rows[0];
}

export async function updateAlbumById(id, updates) {
  // Query the database to update the album and return the newly updated album or null
  const queryText =
    "UPDATE albums SET title = $1, published_date = $2, artist_id = $3 WHERE id = $4 RETURNING *";
  const result = await pool.query(queryText, [
    updates.title,
    updates.published_date,
    updates.artist_id,
    id,
  ]);
  return result.rows[0] || null;
}

export async function deleteAlbumById(id) {
  // Query the database to delete the album and return the deleted album or null
  const queryText = "DELETE FROM albums WHERE id = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}
