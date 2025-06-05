const API_URL = '/api/tickets';

async function getTickets() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const container = document.getElementById('tickets');
  container.innerHTML = '';

  data.forEach(ticket => {
    const el = document.createElement('div');
    el.className = 'ticket';
    el.innerHTML = `
      <strong>ID:</strong> ${ticket.id} |
      <strong>Title:</strong> ${ticket.title} |
      <strong>Status:</strong> ${ticket.status} |
      <strong>Assigned To:</strong> ${ticket.assignedTo || 'N/A'} |
      <strong>Created By:</strong> ${ticket.createdBy}
    `;
    container.appendChild(el);
  });
}

async function createTicket() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const createdBy = document.getElementById('createdBy').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, createdBy })
  });

  getTickets();
}

async function updateTicket() {
  const id = document.getElementById('updateId').value;
  const status = document.getElementById('newStatus').value;
  const description = document.getElementById('newDescription').value;

  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, description })
  });

  getTickets();
}

async function assignTicket() {
  const id = document.getElementById('assignId').value;
  const assignedTo = document.getElementById('assignTo').value;

  await fetch(`${API_URL}/${id}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignedTo })
  });

  getTickets();
}

async function deleteTicket() {
  const id = document.getElementById('deleteId').value;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  getTickets();
}

// Auto load tickets on page load
getTickets();
