function GuestApps({ propertyOwners }) {
  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <div className="search-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" className="search-input" placeholder="Search guest apps" />
        </div>
        <div className="button-group">
          <button className="button button-primary">
            <svg className="button-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New App
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {propertyOwners.map((owner) => (
          <div key={owner.id} className="card">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{owner.property}</h3>
                  <p className="text-sm text-gray-500">{owner.guestAppUrl}</p>
                </div>
                <span className={`list-item-badge ${
                  owner.status === 'Active' ? 'badge-green' : 
                  owner.status === 'Trial' ? 'badge-blue' : 'badge-red'
                }`}>
                  {owner.status}
                </span>
              </div>
              <div className="flex items-center mb-3">
                <div className="table-avatar" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                  {owner.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="ml-2 text-sm">{owner.name}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Plan: {owner.plan}</span>
                <span>Health: {owner.healthScore}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last updated: 3 days ago</span>
                <span>Visits: 127</span>
              </div>
            </div>
            <div className="card-footer">
              <div className="flex justify-between">
                <a href="#" className="card-link">Preview</a>
                <a href="#" className="card-link">Edit</a>
                <a href="#" className="card-link">Analytics</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestApps;

