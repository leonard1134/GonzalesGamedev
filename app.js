const API_URL = 'http://localhost:3000/api/notes';

// Fetch notes from API
async function fetchNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();
    document.getElementById('notesList').innerHTML = notes.map(note => 
        `<li>${note.text} <button onclick="deleteNote(${note.id})">Delete</button></li>`
    ).join('');
}

// Add a new note
async function addNote() {
    const text = document.getElementById('noteText').value;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    fetchNotes();
}

// Delete a note
async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
}

// Load notes when page loads
fetchNotes();
