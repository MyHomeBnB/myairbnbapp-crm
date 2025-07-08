function PropertyOwners({ propertyOwners }) {
  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <div className="search-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" className="search-input" placeholder="Search property owners" />
        </div>
        <div className="button-group">
          <button className="button button-secondary">
            <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
          <button className="button button-primary">
            <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Owner
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Property Owner</th>
                <th>Property</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Health</th>
                <th>MRR</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {propertyOwners.map((owner) => (
                <tr key={owner.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">
                        {owner.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="table-user-details">
                        <div className="table-user-name">{owner.name}</div>
                        <div className="table-user-email">{owner.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table-user-details">
                      <div className="table-user-name">{owner.property}</div>
                      <div className="table-user-email">{owner.guestAppUrl}</div>
                    </div>
                  </td>
                  <td>{owner.plan}</td>
                  <td>
                    <span className={`list-item-badge ${
                      owner.status === 'Active' ? 'badge-green' : 
                      owner.status === 'Trial' ? 'badge-blue' : 'badge-red'
                    }`}>
                      {owner.status}
                    </span>
                  </td>
                  <td>
                    <div className="health-indicator">
                      <div className={`health-dot ${
                        owner.healthScore >= 8 ? 'green' : 
                        owner.healthScore >= 6 ? 'yellow' : 'red'
                      }`}></div>
                      <span>{owner.healthScore}</span>
                    </div>
                  </td>
                  <td>${owner.mrr}</td>
                  <td>
                    <div className="table-actions">
                      <a href="#" className="table-action-link">Edit</a>
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

export default PropertyOwners;

