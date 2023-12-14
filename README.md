# Resume AI

Resume AI is an advanced application that utilizes artificial intelligence to assist users in creating custom resumes and cover letters tailored to their professional history and targeted job descriptions. The application is built on a robust stack that includes OpenAI for natural language processing, Supabase for backend services, LlamaIndex for data extraction, Langchain for language model chaining, PostgreSQL for database management, React.js for the frontend, Node.js and Express.js for the backend, Docker for containerization, Jest for testing, and GitHub Actions for CI/CD workflows.

## Application Architecture

### Frontend

The frontend of Resume AI is developed using React.js and Chakra UI, providing a responsive and accessible user interface. The application includes the following key components:

- **Authentication Pages**: Utilize Chakra UI components to create a seamless sign-in and sign-up experience, with state management handled by React Context or Redux for session persistence.
- **Resume Upload Page**: A drag-and-drop interface allows users to upload their resumes, which are then processed using LlamaIndex for data extraction.
- **AI Interview Page**: Interactive chat interface powered by OpenAI's GPT models to conduct interviews and generate summaries based on the user's professional history.
- **Dashboard**: A central hub for users to track job applications, view saved documents, and access AI-generated content.
- **New Application Page**: Interface for uploading job descriptions and initiating AI-powered context interviews.
- **Generate Documents Page**: Users can review and save AI-generated resumes and cover letters, which are created using a combination of OpenAI and custom algorithms.

### Backend

The backend is built with Node.js and Express.js, providing RESTful APIs that interact with the PostgreSQL database and AI services:

- **Authentication Endpoints**: Handle user registration, login, and session management securely.
- **Resume Processing Endpoint**: Integrates LlamaIndex for extracting data from uploaded resumes and stores the information in the database.
- **AI Interview Endpoints**: Leverage OpenAI to generate interview questions and summaries, and store user responses for further processing.
- **Document Generation Endpoint**: Combines user data with AI services to create personalized resumes and cover letters.

### AI Integration


- **OpenAI**: Generate interview questions and content for resumes and cover letters using GPT models.
- **LlamaIndex**: Extract key information from resumes to feed into the AI interview process.

## Development Roadmap

1. **Setup and Configuration**: Establish the development environment, including Node.js, Docker, and PostgreSQL setup.
2. **Frontend Development**: Implement Chakra UI components and state management for the user interface.
3. **Backend Services**: Develop Express.js endpoints for user authentication, data processing, and AI integration.
4. **AI Services Integration**: Integrate Pydantic, OpenAI, and LlamaIndex for data modeling, content generation, and resume processing.
5. **Database Schema Design**: Update the PostgreSQL schema to support new data models and relationships.
6. **State Management and Error Handling**: Refine state management on the frontend and enhance error handling across the application.
7. **Testing and Validation**: Write and run Jest tests for all endpoints and components, ensuring reliability and stability.
8. **Documentation**: Update documentation, including README.md, to reflect the latest application features and architecture.
9. **Deployment**: Configure GitHub Actions for CI/CD pipelines to automate testing and deployment processes.

## Technologies Used

- **Frontend**: [React.js](https://reactjs.org/), [Chakra UI](https://chakra-ui.com/), [Redux](https://redux.js.org/)/[React Context](https://reactjs.org/docs/context.html)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Supabase](https://supabase.io/)
- **AI Services**: [OpenAI](https://openai.com/), [LlamaIndex](https://llamaindex.com/), [Langchain](https://langchain.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Containerization**: [Docker](https://www.docker.com/)
- **Testing**: [Jest](https://jestjs.io/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## Contributing

We welcome contributions to Resume AI. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
