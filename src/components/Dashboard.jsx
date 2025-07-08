function Dashboard({ metrics, recentActivities, supportTickets, setActiveTab }) {
  return (
    <div className="content">
      {/* Metric Cards */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Total Property Owners</div>
                <div className="metric-value">{metrics.totalOwners}</div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); setActiveTab('property-owners'); }}>
              View all
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Monthly Revenue</div>
                <div className="metric-value">${metrics.monthlyRevenue}</div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); setActiveTab('subscriptions'); }}>
              View details
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Open Support Tickets</div>
                <div className="metric-value">{metrics.openTickets}</div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); setActiveTab('support'); }}>
              View all tickets
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Active Guest Apps</div>
                <div className="metric-value">{metrics.activeGuestApps}</div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); setActiveTab('guest-apps'); }}>
              View all apps
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section-header">
        <h2 className="section-title">Recent Activity</h2>
      </div>
      <div className="card">
        <ul className="list">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="list-item">
              <div className="list-item-content">
                <div className="list-item-primary">
                  <div className={`list-item-icon ${
                    activity.type === 'New Signup' ? 'green' : 
                    activity.type === 'Support Ticket' ? 'yellow' : 
                    activity.type === 'Subscription' ? 'blue' : 
                    activity.type === 'Guest App' ? 'purple' : 'blue'
                  }`}>
                    {activity.type === 'New Signup' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                    )}
                    {activity.type === 'Support Ticket' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="4"></circle>
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                      </svg>
                    )}
                    {activity.type === 'Subscription' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    )}
                    {activity.type === 'Guest App' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                    )}
                    {activity.type === 'Integration' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    )}
                  </div>
                  <div className="list-item-details">
                    <div className="list-item-title">
                      {activity.user} - {activity.property}
                    </div>
                    <div className="list-item-subtitle">
                      {activity.details}
                    </div>
                  </div>
                </div>
                <div className="list-item-badge">
                  {activity.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Support Tickets */}
      <div className="section-header" style={{ marginTop: '24px' }}>
        <h2 className="section-title">Recent Support Tickets</h2>
        <a href="#" className="card-link" onClick={(e) => { e.preventDefault(); setActiveTab('support'); }}>
          View all
        </a>
      </div>
      <div className="card">
        <ul className="list">
          {supportTickets.slice(0, 3).map((ticket) => (
            <li key={ticket.id} className="list-item">
              <div className="list-item-content">
                <div className="list-item-primary">
                  <div className={`list-item-icon ${
                    ticket.priority === 'High' ? 'red' : 
                    ticket.priority === 'Medium' ? 'yellow' : 'green'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="4"></circle>
                      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                      <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                    </svg>
                  </div>
                  <div className="list-item-details">
                    <div className="list-item-title">
                      {ticket.subject}
                    </div>
                    <div className="list-item-subtitle">
                      {ticket.owner} - {ticket.property}
                    </div>
                  </div>
                </div>
                <div className={`list-item-badge ${
                  ticket.status === 'Open' ? 'badge-yellow' : 
                  ticket.status === 'In Progress' ? 'badge-blue' : 'badge-green'
                }`}>
                  {ticket.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

