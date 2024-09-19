import { pool } from "../index.js";

// >>> MAKE SURE YOU UNDERSTAND THIS FILE AND WHAT IT'S DOING <<<
// >>> FEEL FREE TO CHANGE IT TO MAKE YOUR OWN RESOURCES (TABLES AND PROPERTIES) - YOU DON'T HAVE TO USE ALBUMS AND ARTISTS <<<

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS artists CASCADE;
        DROP TABLE IF EXISTS albums CASCADE;
    `);

    // Create the artists table
    await pool.query(`
        CREATE TABLE artists (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `);

    // Create the albums table with a foreign key to the artists table
    await pool.query(`
        CREATE TABLE albums (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            published_date DATE,
            artist_id INT REFERENCES artists(id)
        );
    `);

    // Seed the artists table
    await pool.query(`
        INSERT INTO artists (name)
        VALUES 
            ('Dua Lipa'),
            ('Jay-Z');
    `);

    // Seed the albums table
    await pool.query(`
        INSERT INTO albums (title, published_date, artist_id)
        VALUES 
            ('Dua Lipa', '2017-06-02', 1),
            ('Future Nostalgia', '2020-03-27', 1),
            ('Reasonable Doubt', '1996-06-25', 2),
            ('The Blueprint', '2001-09-11', 2);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
