# Resume AI

Resume AI is an application that leverages artificial intelligence to generate custom resumes and cover letters based on the user's professional history and the job they are applying for. It uses technologies like OpenAI, Supabase, LlamaIndex, Langchain, PostgreSQL, React.js, Node.js, Express.js, Docker, Jest, and GitHub Actions.

## Features

- User authentication
- Resume upload and processing
- AI-powered interview based on professional history
- Job description upload and processing
- AI-powered context interview based on job description
- AI-powered resume and cover letter generation using professional history, bio, and job context
- Job tracking and document export

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker
- PostgreSQL

### Installation

Clone the repository
git clone https://github.com/MJ-Ref/resume-ai.git
cd resume-ai

Install NPM packages
npm install

Build the Docker image
docker build -t resume-ai .

Run the Docker container
docker run -p 8080:8080 resume-ai

The application should now be running at http://localhost:8080

Run the tests using Jest
npm test

## Usage

1. Sign up or sign in to the application.
2. Upload your resume and answer the AI-powered interview questions based on your professional history.
3. Upload a job description and answer the AI-powered context questions based on the job description.
4. Generate a tailored resume and cover letter using your professional history, bio, and job context.
5. Save the generated documents to your account.
6. Track your job applications and export your documents.

## Running the tests

Run the tests using Jest:

npm test

## Deployment

This application uses GitHub Actions for continuous integration and continuous deployment. Pushes to the main branch will trigger a build and deployment process.

## Built With

- [OpenAI](https://openai.com/)
- [Supabase](https://supabase.io/)
- [LlamaIndex](https://llamaindex.com/)
- [Langchain](https://langchain.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/)
- [GitHub Actions](https://github.com/features/actions)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
