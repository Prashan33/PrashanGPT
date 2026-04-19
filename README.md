# PrashanGPT

> A full-stack, ChatGPT-style conversational AI web application built with the MERN stack and the OpenAI API — featuring persistent chat history, multi-thread conversations, markdown rendering with syntax highlighting, and a polished, production-deployed UI.

---

## Key Highlights

- **Full-stack MERN application** powered by **React 19**, **Vite**, **Node.js**, **Express 5**, and **MongoDB**.
- **OpenAI-powered chat engine** with multi-threaded conversation memory persisted in MongoDB.
- **Rich markdown responses** with real-time typing animation and GitHub-dark syntax highlighting for code blocks.
- **Thread management system** — create, switch, and delete chat sessions, each with its own UUID and history.
- **Deployed end-to-end on Render** with CORS-hardened API access and environment-based configuration.

---

## 1. Overview

**PrashanGPT** is a full-stack AI chat platform inspired by the ChatGPT experience. It provides a clean, responsive interface where users can have multiple ongoing AI-powered conversations, each stored permanently in a MongoDB database. The backend acts as a secure gateway between the client and the OpenAI API, while the frontend delivers a smooth, real-time chat experience with markdown rendering, code highlighting, and thread-based conversation management.

The project is engineered as a complete, deployable product rather than a tutorial clone — from schema design to CORS-configured deployment on Render.

---

## 2. Why This Project Matters

Most AI chat demos are stateless, single-session, or tightly coupled to a vendor SDK. PrashanGPT solves that by building a **real, database-backed conversational system** around the OpenAI API:

- It **preserves conversation history** across sessions, so users can return to past chats just like in ChatGPT.
- It **abstracts away the OpenAI integration** behind a clean Express API, keeping API keys off the client and enabling future model swaps without touching the frontend.
- It demonstrates **end-to-end full-stack engineering** — data modeling, REST API design, React state architecture, deployment, and CORS/security configuration — in a single cohesive product.

For recruiters, it showcases practical, deployable engineering: not just "a React app that calls an API," but a complete, production-shaped system.

---

## 3. Key Features

- **Multi-Thread Chat System** — every conversation is a separate thread with its own UUID, title, and message history.
- **Persistent History (MongoDB)** — all user and assistant messages are stored in a structured Mongoose schema with timestamps.
- **OpenAI Integration** — clean server-side wrapper around the OpenAI chat completions endpoint; API keys never leave the server.
- **Markdown + Code Highlighting** — assistant replies are rendered through `react-markdown` with `rehype-highlight` and the GitHub-dark theme.
- **Typing Animation** — the latest assistant reply is streamed word-by-word to the UI for a natural, ChatGPT-like feel.
- **Thread Sidebar** — list, switch between, and delete past conversations; the active thread is visually highlighted.
- **New Chat Flow** — generates a new UUID-based thread on demand and resets the conversation state cleanly.
- **Loading States** — `react-spinners` provides smooth feedback while awaiting the AI response.
- **Deployment-Ready** — production build deployed on Render, with environment-driven API URLs and explicit CORS allow-listing.

---

## 4. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + Vite | Fast, modern SPA with HMR-powered dev experience |
| **State Management** | React Context API | Shares chat state (prompt, reply, threads) across components without extra libraries |
| **Markdown Rendering** | `react-markdown` + `rehype-highlight` + `highlight.js` | Renders AI responses with formatted text and syntax-highlighted code blocks |
| **UI Feedback** | `react-spinners` | Non-blocking loading indicators while awaiting API responses |
| **Icons** | Font Awesome (CDN) | Lightweight iconography for sidebar, nav, and input controls |
| **IDs** | `uuid` (v1) | Unique, time-based identifiers for each conversation thread |
| **Backend Runtime** | Node.js + Express 5 | REST API server handling chat and thread routes |
| **Database** | MongoDB + Mongoose | Persistent storage for threads and message history with schema validation |
| **AI Provider** | OpenAI Chat Completions API | Generates assistant responses from user prompts |
| **Config & Security** | `dotenv`, `cors` | Environment-based secrets and strict origin control |
| **Deployment** | Render | Hosting for both the frontend and backend services |

Each dependency is intentional — no bloat, no unused frameworks.

---

## 5. How It Works

```
┌─────────────────┐       HTTPS        ┌──────────────────────┐        HTTPS       ┌──────────────┐
│   React Client  │  ───────────────►  │  Express API Server  │  ───────────────►  │  OpenAI API  │
│  (Vite + React) │  ◄───────────────  │  (Node + Mongoose)   │  ◄───────────────  │              │
└─────────────────┘   JSON / REST      └──────────┬───────────┘   chat completion  └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   MongoDB    │
                                          │  (Threads)   │
                                          └──────────────┘
```

1. The user types a prompt in the React UI. A UUID-based `threadId` is generated on first load.
2. The frontend `POST`s `{ threadId, message }` to `/api/chat`.
3. The backend finds the matching thread (or creates one if new), appends the user message, and calls the OpenAI endpoint.
4. The assistant reply is appended to the thread, `updatedAt` is refreshed, and the document is saved to MongoDB.
5. The response is returned to the client, where it's rendered with a word-by-word typing effect and full markdown support.
6. The sidebar re-fetches all threads, so newly created conversations appear instantly in the history panel.

---

## 6. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Sends a user message, generates an AI reply, and persists both in the thread |
| `GET` | `/api/thread` | Returns all threads, sorted by most recently updated |
| `GET` | `/api/thread/:threadId` | Returns the full message history for a specific thread |
| `DELETE` | `/api/thread/:threadId` | Deletes a thread and its message history |

---

## 7. Project Structure

```
PrashanGPT/
├── Backend/
│   ├── models/
│   │   └── Thread.js          # Mongoose schema for threads + messages
│   ├── routes/
│   │   └── chat.js            # REST endpoints for chat + thread management
│   ├── utils/
│   │   └── openai.js          # Server-side wrapper around OpenAI API
│   ├── server.js              # Express app, CORS, Mongo bootstrap
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx            # Root layout + context provider
    │   ├── MyContext.jsx      # Global chat state (Context API)
    │   ├── Sidebar.jsx        # Thread list, new chat, delete
    │   ├── ChatWindow.jsx     # Input, navbar, reply flow
    │   ├── Chat.jsx           # Message rendering + typing animation
    │   ├── assets/
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---


---

## 8. Installation and Setup

### Prerequisites

- Node.js 18+
- A MongoDB connection string (Atlas or local)
- An OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/PrashanGPT.git
cd PrashanGPT
```

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=8080
```

Start the server:

```bash
node server.js
# or, for hot reload during dev:
npx nodemon server.js
```

### 3. Configure the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:8080
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Production build

```bash
npm run build
npm run preview
```

---

## 9. Usage

1. Open the app — a new thread is created automatically with a fresh UUID.
2. Type a prompt and press **Enter** (or click the send icon).
3. Watch the AI reply stream in with markdown formatting and syntax highlighting.
4. Use the sidebar to:
   - **Start** a new chat (pen icon)
   - **Switch** between previous threads (click any entry)
   - **Delete** a thread (trash icon)
5. All messages persist — closing and reopening the app restores your history from MongoDB.

---

## 10. Future Improvements

- **User authentication** (JWT / OAuth) so threads are scoped per user.
- **Streaming responses** via Server-Sent Events or WebSockets instead of polled completions.
- **Conversation context memory** — send the full message history to OpenAI so replies are context-aware across turns.
- **Auto-generated thread titles** using the model itself for cleaner sidebar labels.
- **Search & filter** across past conversations.
- **Attachment and file-upload support** for document Q&A.
- **Mobile-first responsive polish** and a dark/light theme toggle.
- **Rate limiting & request validation** on the backend for production hardening.

---

## 11. Why This Project Stands Out

- **End-to-end ownership** — data model, API, UI, deployment, and CORS are all designed and shipped as one cohesive system.
- **Clean separation of concerns** — the OpenAI call is isolated in a single utility, the schema is explicit, and state is managed through React Context rather than prop-drilling.
- **Production deployment** — not a localhost demo; it's live on Render with environment-driven configuration and origin-locked CORS.
- **Real UX polish** — typing animation, markdown with code highlighting, loading spinners, and thread highlighting all contribute to a genuinely usable product.
- **Pragmatic engineering choices** — React Context over Redux, a direct `fetch` wrapper over the OpenAI SDK for transparency, UUID v1 for time-ordered IDs, and Mongoose schemas for predictable data shape.
- **Extensible foundation** — the thread/message schema and REST surface are designed so features like auth, streaming, and multi-turn context can be layered in without rewrites.

---

## 12. Author

**Prashan Adhikari**
Full-stack developer focused on building practical, user-facing products with modern JavaScript, React, and Node.js.

- GitHub: `@Prashan33`
- Email: `prashandhikari2486@gmail.com`
