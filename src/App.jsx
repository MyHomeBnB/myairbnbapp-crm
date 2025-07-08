import { useState } from 'react';
import './App.css';

// Import components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PropertyOwners from './components/PropertyOwners';
import GuestApps from './components/GuestApps';
import Support from './components/Support';
import Subscriptions from './components/Subscriptions';
import Integrations from './components/Integrations';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data for the CRM
  const propertyOwners = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@beachhouse.com', property: 'Beach House Retreat', plan: 'Professional', status: 'Active', mrr: 79, healthScore: 9.2, lastLogin: '2 hours ago', guestAppUrl: 'beachhouse.myairbnbapp.com' },
    { id: 2, name: 'Michael Chen', email: 'michael@cityloft.com', property: 'Downtown City Loft', plan: 'Starter', status: 'Active', mrr: 29, healthScore: 7.5, lastLogin: '1 day ago', guestAppUrl: 'cityloft.myairbnbapp.com' },
    { id: 3, name: 'Emma Wilson', email: 'emma@mountaincabin.com', property: 'Mountain View Cabin', plan: 'Enterprise', status: 'Active', mrr: 199, healthScore: 9.8, lastLogin: '5 hours ago', guestAppUrl: 'mountaincabin.myairbnbapp.com' },
    { id: 4, name: 'David Rodriguez', email: 'david@lakehouse.com', property: 'Lakefront Getaway', plan: 'Professional', status: 'Active', mrr: 79, healthScore: 8.7, lastLogin: '3 days ago', guestAppUrl: 'lakehouse.myairbnbapp.com' },
    { id: 5, name: 'Lisa Thompson', email: 'lisa@vineyardvilla.com', property: 'Vineyard Villa', plan: 'Professional', status: 'Trial', mrr: 0, healthScore: 6.5, lastLogin: '12 hours ago', guestAppUrl: 'vineyardvilla.myairbnbapp.com' },
    { id: 6, name: 'James Wilson', email: 'james@urbanflat.com', property: 'Urban Luxury Flat', plan: 'Starter', status: 'Overdue', mrr: 29, healthScore: 4.2, lastLogin: '7 days ago', guestAppUrl: 'urbanflat.myairbnbapp.com' },
    { id: 7, name: 'Olivia Martinez', email: 'olivia@beachcondo.com', property: 'Oceanfront Condo', plan: 'Enterprise', status: 'Active', mrr: 199, healthScore: 9.5, lastLogin: '1 hour ago', guestAppUrl: 'beachcondo.myairbnbapp.com' },
  ];
  
  const supportTickets = [
    { id: 1, owner: 'James Wilson', property: 'Urban Luxury Flat', subject: 'Integration with Airbnb calendar not working', status: 'Open', priority: 'High', created: '2 days ago', assigned: 'Support Team' },
    { id: 2, owner: 'Sarah Johnson', property: 'Beach House Retreat', subject: 'Need help customizing welcome message', status: 'In Progress', priority: 'Medium', created: '1 day ago', assigned: 'Alex Chen' },
    { id: 3, owner: 'Lisa Thompson', property: 'Vineyard Villa', subject: 'How do I add more local attractions?', status: 'Open', priority: 'Low', created: '4 hours ago', assigned: 'Unassigned' },
    { id: 4, owner: 'Michael Chen', property: 'Downtown City Loft', subject: 'Guest app showing error on mobile', status: 'Open', priority: 'High', created: '3 hours ago', assigned: 'Tech Support' },
    { id: 5, owner: 'Emma Wilson', property: 'Mountain View Cabin', subject: 'Billing question about Enterprise plan', status: 'Closed', priority: 'Medium', created: '5 days ago', assigned: 'Billing Team' },
  ];
  
  const integrations = [
    { id: 1, name: 'Airbnb API', status: 'Connected', properties: 5, lastSync: '10 minutes ago' },
    { id: 2, name: 'Google Calendar', status: 'Connected', properties: 7, lastSync: '15 minutes ago' },
    { id: 3, name: 'Booking.com', status: 'Not Connected', properties: 0, lastSync: 'Never' },
    { id: 4, name: 'VRBO/HomeAway', status: 'Connected', properties: 3, lastSync: '1 hour ago' },
    { id: 5, name: 'Stripe Payments', status: 'Connected', properties: 7, lastSync: '5 minutes ago' },
    { id: 6, name: 'Mailchimp', status: 'Connected', properties: 4, lastSync: '2 hours ago' },
  ];
  
  const subscriptionPlans = [
    { id: 1, name: 'Starter', price: 29, properties: 1, features: ['Basic Guest App', 'Property Info', 'Local Attractions', 'WiFi Details'] },
    { id: 2, name: 'Professional', price: 79, properties: 3, features: ['Everything in Starter', 'Custom Branding', 'Guest Check-in', 'Support Chat', 'Analytics'] },
    { id: 3, name: 'Enterprise', price: 199, properties: 10, features: ['Everything in Professional', 'Multiple Properties', 'API Access', 'Priority Support', 'Custom Integrations'] },
  ];
  
  const recentActivities = [
    { id: 1, type: 'New Signup', user: 'Lisa Thompson', property: 'Vineyard Villa', time: '12 hours ago', details: 'Started free trial of Professional plan' },
    { id: 2, type: 'Support Ticket', user: 'James Wilson', property: 'Urban Luxury Flat', time: '2 days ago', details: 'Opened ticket about calendar integration' },
    { id: 3, type: 'Subscription', user: 'Emma Wilson', property: 'Mountain View Cabin', time: '5 days ago', details: 'Upgraded to Enterprise plan' },
    { id: 4, type: 'Guest App', user: 'Sarah Johnson', property: 'Beach House Retreat', time: '1 week ago', details: 'Updated property photos and description' },
    { id: 5, type: 'Integration', user: 'Michael Chen', property: 'Downtown City Loft', time: '1 week ago', details: 'Connected Airbnb API' },
  ];
  
  // Dashboard metrics
  const metrics = {
    totalOwners: propertyOwners.length,
    activeSubscriptions: propertyOwners.filter(owner => owner.status === 'Active').length,
    monthlyRevenue: propertyOwners.reduce((total, owner) => total + owner.mrr, 0),
    openTickets: supportTickets.filter(ticket => ticket.status !== 'Closed').length,
    averageHealth: (propertyOwners.reduce((total, owner) => total + owner.healthScore, 0) / propertyOwners.length).toFixed(1),
    trialConversions: '68%',
    churnRate: '3.2%',
    activeGuestApps: propertyOwners.length,
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header activeTab={activeTab} />
        
        {/* Content */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            metrics={metrics} 
            recentActivities={recentActivities} 
            supportTickets={supportTickets} 
            setActiveTab={setActiveTab} 
          />
        )}
        
        {activeTab === 'property-owners' && (
          <PropertyOwners propertyOwners={propertyOwners} />
        )}
        
        {activeTab === 'guest-apps' && (
          <GuestApps propertyOwners={propertyOwners} />
        )}
        
        {activeTab === 'subscriptions' && (
          <Subscriptions subscriptionPlans={subscriptionPlans} metrics={metrics} />
        )}
        
        {activeTab === 'support' && (
          <Support supportTickets={supportTickets} />
        )}
        
        {activeTab === 'integrations' && (
          <Integrations integrations={integrations} />
        )}
        
        {activeTab === 'analytics' && (
          <div className="content">
            <h2 className="section-title">Analytics</h2>
            <p>Analytics dashboard coming soon...</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="content">
            <h2 className="section-title">Settings</h2>
            <p>Settings page coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

