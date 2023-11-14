javascript
const express = require('express');
const router = express.Router();
const { supabase } = require('../database.js');

// User sign up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ user });
});

// User sign in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ user });
});

// User sign out
router.post('/signout', async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: 'User signed out' });
});

// Get current user
router.get('/user', async (req, res) => {
  const user = supabase.auth.user();

  if (!user) return res.status(401).json({ error: 'Not authenticated' });
  return res.status(200).json({ user });
});

module.exports = router;

