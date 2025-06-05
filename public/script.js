async function fetchTickets() {
  const res = await fetch('/api/tickets');
  const tickets = await res.json();

  const list = document.getElementById('ticketList');
  list.innerHTML = '';

  tickets.forEach(ticket => {
    const item = document.createElement('li');
    item.textContent = `${ticket.title} - ${ticket.status}`;
    list.appendChild(item);
  });
}

async function createTicket() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const createdBy = document.getElementById('createdBy').value;

  await fetch('/api/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, createdBy })
  });

  fetchTickets();
}

window.onload = fetchTickets;
