# La Crochet

La Crochet is a crochet storefront project with a React and Vite frontend and a small FastAPI backend. The frontend currently includes the landing page, responsive navigation, and a login dialog. The backend currently provides a health message and sample product data.

## Project structure

```text
.
├── backend/
│   └── main.py             # FastAPI app and sample products endpoint
├── la-crochet-project/     # React + Vite frontend
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Requirements

- Node.js and npm
- Python 3.10 or newer

## Run the frontend

In a terminal, go to the frontend directory and install its dependencies:

```bash
cd la-crochet-project
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Other available frontend commands:

```bash
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Run the backend

From the repository root, install the backend packages:

```bash
python -m pip install fastapi "uvicorn[standard]"
```

Start the API from the `backend` directory:

```bash
cd backend
python -m uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`. Interactive API documentation is at `http://127.0.0.1:8000/docs`.

### Current API routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Returns a message confirming that the API is running. |
| `GET` | `/api/products` | Returns sample product data. |

The backend allows cross-origin requests from the Vite development URL `http://localhost:5173`.

## Development notes

- Frontend source code and assets are in `la-crochet-project/src/`.
- The backend currently returns hard-coded sample products; it does not yet use a database.
- Run the frontend and backend in separate terminals when working on both.
