import { useEffect, useState } from "react";
import pandas

const API_URL = import.meta.env.VITE_API_URL || " ";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Could not reach backend at " + API_URL);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Notes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addNote} style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8, padding: 8 }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8, padding: 8 }}
        />
        <button type="submit">Add Note</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li key={note._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 8 }}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
