function Header({ activeTab }) {
  // Function to get the page title based on the active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'property-owners':
        return 'Property Owners';
      case 'guest-apps':
        return 'Guest Apps';
      case 'subscriptions':
        return 'Subscriptions';
      case 'support':
        return 'Support';
      case 'analytics':
        return 'Analytics';
      case 'integrations':
        return 'Integrations';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="header">
      <h1 className="page-title">{getPageTitle()}</h1>
      <div className="header-actions">
        <button className="header-icon-button" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              width="36" 
              height="36"
            />
          </div>
          <span className="user-name">Admin User</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

