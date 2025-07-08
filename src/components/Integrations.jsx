function Integrations({ integrations }) {
  return (
    <div className="content">
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Integration</th>
                <th>Status</th>
                <th>Properties</th>
                <th>Last Sync</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map((integration) => (
                <tr key={integration.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </div>
                      <div className="table-user-name">{integration.name}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`list-item-badge ${
                      integration.status === 'Connected' ? 'badge-green' : 'badge-yellow'
                    }`}>
                      {integration.status}
                    </span>
                  </td>
                  <td>{integration.properties}</td>
                  <td>{integration.lastSync}</td>
                  <td>
                    <div className="table-actions">
                      {integration.status === 'Connected' ? (
                        <a href="#" className="table-action-link">Configure</a>
                      ) : (
                        <a href="#" className="table-action-link">Connect</a>
                      )}
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

export default Integrations;

