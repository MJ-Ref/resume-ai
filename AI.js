const express = require('express');
const router = express.Router();
const { supabase, pool } = require('../database.js');
const { OpenAI } = require('openai');
const { PromptTemplate } = require('langchain/prompts');

// Initialize OpenAI
const openai = new OpenAI(process.env.OPENAI_KEY);

// AI-powered interview
router.post('/interview', async (req, res) => {
  const { userId, text } = req.body;

  // Generate a response using OpenAI
  const response = await openai.complete({
    engine: 'gpt-4',
    prompt: text,
    max_tokens: 150,
  });

  // Save the conversation to the database
  const { data, error } = await supabase
    .from('conversations')
    .insert([
      { userId, text: response.choices[0].text.trim() },
    ]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ conversation: data[0] });
});

// AI-powered resume and cover letter generation
router.post('/generate', async (req, res) => {
  const { userId, jobId } = req.body;

  // Get the user's professional history and job application from the database
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('professional_history')
    .eq('id', userId);
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('description')
    .eq('id', jobId);

  if (userError || jobError) return res.status(500).json({ error: userError || jobError });

  // Generate a tailored resume and cover letter using OpenAI
  const resumePromptTemplate = new PromptTemplate({
    template: "Generate a resume based on the following professional history: {professional_history} for the job description: {job_description} and company context: {company_context}",
    inputVariables: ["professional_history", "job_description", "company_context"],
  });
  
  const coverLetterPromptTemplate = new PromptTemplate({
    template: "Generate a cover letter based on the following professional history: {professional_history} for the job description: {job_description} and company context: {company_context}",
    inputVariables: ["professional_history", "job_description", "company_context"],
  });
  
  const resumePrompt = await resumePromptTemplate.format({ professional_history: user[0].professional_history, job_description: job[0].description, company_context: job[0].company_context });
  const coverLetterPrompt = await coverLetterPromptTemplate.format({ professional_history: user[0].professional_history, job_description: job[0].description, company_context: job[0].company_context });

  const resumeResponse = await openai.complete({
    engine: 'gpt-4',
    prompt: resumePrompt,
    max_tokens: 300,
  });

  const coverLetterResponse = await openai.complete({
    engine: 'gpt-4',
    prompt: coverLetterPrompt,
    max_tokens: 300,
  });

  // Save the generated resume and cover letter to the database
  const { data: resumeData, error: resumeError } = await supabase
    .from('resumes')
    .insert([
      { userId, jobId, text: resumeResponse.choices[0].text.trim() },
    ]);

  const { data: coverLetterData, error: coverLetterError } = await supabase
    .from('cover_letters')
    .insert([
      { userId, jobId, text: coverLetterResponse.choices[0].text.trim() },
    ]);

  if (resumeError || coverLetterError) return res.status(500).json({ error: resumeError || coverLetterError });
  return res.status(200).json({ resume: resumeData[0], coverLetter: coverLetterData[0] });
});

module.exports = router;