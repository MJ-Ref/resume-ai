
const express = require('express');
const router = express.Router();
const { supabase, pool } = require('../database.js');

// Get user's professional history
router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('professional_history')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
});

// Get user's job applications
router.get('/jobs/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
});

// Get user's generated resumes and cover letters
router.get('/documents/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
});

module.exports = router;

