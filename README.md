# Notes App (DevOps Practice Project)

A deliberately simple MERN-stack notes app. The point of this app is NOT its features —
it exists purely as something real to run through a full DevOps pipeline:
Docker → Jenkins CI → DockerHub → GitHub (manifest update) → ArgoCD CD → AWS EKS → Prometheus/Grafana monitoring.

## Stack
- **Backend**: Node.js + Express + Mongoose (MongoDB), 3 endpoints: list/create/delete notes
- **Frontend**: React + Vite, simple form + list UI
- **Database**: MongoDB

## Structure
```
notes-app/
├── backend/
│   ├── server.js          # entry point
│   ├── models/Note.js      # Mongoose schema
│   ├── controllers/notesController.js
│   ├── routes/notes.js
│   ├── package.json
│   └── .env.example        # copy to .env.docker or .env for local dev
├── frontend/
│   ├── src/App.jsx          # main UI
│   ├── src/main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env.example
└── README.md
```

## Running locally without Docker (optional sanity check)
```bash
# Terminal 1 - MongoDB (if you have it installed locally, or use Docker just for this one piece)
mongod

# Terminal 2 - backend
cd backend
cp .env.example .env
npm install
npm run dev

# Terminal 3 - frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

Everything else (Dockerfiles, docker-compose.yml, Jenkinsfile, Kubernetes manifests) is intentionally
NOT included here — those are what you're building yourself, from scratch, as the actual learning exercise.
