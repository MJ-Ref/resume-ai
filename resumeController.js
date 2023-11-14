javascript
const express = require('express');
const router = express.Router();
const { supabase, pool } = require('../database.js');
const { LlamaIndex } = require('llamaindex');
const { Langchain } = require('langchain');

// Initialize LlamaIndex and Langchain
const llamaIndex = new LlamaIndex();
const langchain = new Langchain();

// Upload and process resume
router.post('/upload', async (req, res) => {
  const { user, file } = req.body;

  // Store the resume file using Supabase
  const { data, error } = await supabase.storage.from('resumes').upload(`${user.id}/${file.name}`, file);

  if (error) return res.status(500).json({ error: error.message });

  // Extract and index professional history using LlamaIndex
  const history = llamaIndex.extract(file);

  // Store the professional history in PostgreSQL
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const insertText = 'INSERT INTO history(user_id, history) VALUES($1, $2)';
    const insertValues = [user.id, history];
    await client.query(insertText, insertValues);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }

  return res.status(200).json({ message: 'Resume uploaded and processed', data });
});

// Generate resume and cover letter
router.post('/generate', async (req, res) => {
  const { user, job } = req.body;

  // Retrieve the professional history from PostgreSQL
  const client = await pool.connect();
  let history;
  try {
    const res = await client.query('SELECT history FROM history WHERE user_id = $1', [user.id]);
    history = res.rows[0].history;
  } finally {
    client.release();
  }

  // Generate the resume and cover letter using Langchain
  const { resume, coverLetter } = langchain.generate(history, job);

  // Store the generated resume and cover letter in PostgreSQL
  try {
    await client.query('BEGIN');
    const insertText = 'INSERT INTO applications(user_id, job_id, resume, cover_letter) VALUES($1, $2, $3, $4)';
    const insertValues = [user.id, job.id, resume, coverLetter];
    await client.query(insertText, insertValues);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }

  return res.status(200).json({ message: 'Resume and cover letter generated', resume, coverLetter });
});

module.exports = router;

