
const express = require('express');
const router = express.Router();
const { supabase, pool } = require('../database.js');
const { OpenAI } = require('openai');
const { PromptTemplate } = require('langchain/prompts');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Upload job description
router.post('/upload', async (req, res) => {
  const { user, jobDescription, companyLink } = req.body;

  // Store job description in PostgreSQL
  const jobResult = await pool.query('INSERT INTO jobs(user_id, description, company_link) VALUES($1, $2, $3) RETURNING *', [user.id, jobDescription, companyLink]);

  if (jobResult.error) return res.status(500).json({ error: jobResult.error.message });

  // Generate context for the job
  const contextPromptTemplate = new PromptTemplate({
    template: "Generate context for the job based on the description: {job_description}",
    inputVariables: ["job_description"],
  });

  const contextPrompt = await contextPromptTemplate.format({ job_description: jobDescription });

  const contextResult = await openai.complete({
    engine: 'davinci-codex',
    prompt: contextPrompt,
    max_tokens: 200
  });

  if (contextResult.error) return res.status(500).json({ error: contextResult.error.message });

  // Store context in PostgreSQL
  const contextResultDB = await pool.query('UPDATE jobs SET context=$1 WHERE id=$2 RETURNING *', [contextResult.choices[0].text, jobResult.rows[0].id]);

  if (contextResultDB.error) return res.status(500).json({ error: contextResultDB.error.message });

  return res.status(200).json({ job: contextResultDB.rows[0] });
});

// Get all jobs for a user
router.get('/all', async (req, res) => {
  const { user } = req.body;

  const result = await pool.query('SELECT * FROM jobs WHERE user_id=$1', [user.id]);

  if (result.error) return res.status(500).json({ error: result.error.message });

  return res.status(200).json({ jobs: result.rows });
});

// Get a specific job
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM jobs WHERE id=$1', [id]);

  if (result.error) return res.status(500).json({ error: result.error.message });

  return res.status(200).json({ job: result.rows[0] });
});

module.exports = router;