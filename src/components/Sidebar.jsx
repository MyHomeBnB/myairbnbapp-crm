import { useState } from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">MyAirbnbApp CRM</h1>
        <button 
          className="sidebar-toggle" 
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 17 18 12 13 7"></polyline>
              <polyline points="6 17 11 12 6 7"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          )}
        </button>
      </div>
      
      <div className="sidebar-section">
        <p className="sidebar-section-title">Main</p>
        <ul className="sidebar-nav">
          <li className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span className="sidebar-text">Dashboard</span>
            </a>
          </li>
          <li className={`sidebar-nav-item ${activeTab === 'property-owners' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('property-owners'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="sidebar-text">Property Owners</span>
            </a>
          </li>
          <li className={`sidebar-nav-item ${activeTab === 'guest-apps' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('guest-apps'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span className="sidebar-text">Guest Apps</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <p className="sidebar-section-title">Business</p>
        <ul className="sidebar-nav">
          <li className={`sidebar-nav-item ${activeTab === 'subscriptions' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('subscriptions'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              <span className="sidebar-text">Subscriptions</span>
            </a>
          </li>
          <li className={`sidebar-nav-item ${activeTab === 'support' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('support'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
              </svg>
              <span className="sidebar-text">Support</span>
            </a>
          </li>
          <li className={`sidebar-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('analytics'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span className="sidebar-text">Analytics</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <p className="sidebar-section-title">System</p>
        <ul className="sidebar-nav">
          <li className={`sidebar-nav-item ${activeTab === 'integrations' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('integrations'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <span className="sidebar-text">Integrations</span>
            </a>
          </li>
          <li className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="sidebar-nav-link" 
              onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}
            >
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span className="sidebar-text">Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

