function Support({ supportTickets }) {
  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <div className="search-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" className="search-input" placeholder="Search tickets" />
        </div>
        <div className="button-group">
          <button className="button button-primary">
            <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Ticket
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Property Owner</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
                <th>Assigned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <div className="table-user-details">
                      <div className="table-user-name">{ticket.subject}</div>
                      <div className="table-user-email">#{ticket.id}</div>
                    </div>
                  </td>
                  <td>
                    <div className="table-user-details">
                      <div className="table-user-name">{ticket.owner}</div>
                      <div className="table-user-email">{ticket.property}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`list-item-badge ${
                      ticket.status === 'Open' ? 'badge-yellow' : 
                      ticket.status === 'In Progress' ? 'badge-blue' : 'badge-green'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <span className={`list-item-badge ${
                      ticket.priority === 'High' ? 'badge-red' : 
                      ticket.priority === 'Medium' ? 'badge-yellow' : 'badge-green'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>{ticket.created}</td>
                  <td>{ticket.assigned}</td>
                  <td>
                    <div className="table-actions">
                      <a href="#" className="table-action-link">View</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Support;

