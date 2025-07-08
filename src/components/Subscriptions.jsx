function Subscriptions({ subscriptionPlans, metrics }) {
  return (
    <div className="content">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="card">
            <div className="card-body">
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-extrabold text-gray-900">${plan.price}</span>
                <span className="ml-1 text-sm font-medium text-gray-500">/month</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Up to {plan.properties} {plan.properties === 1 ? 'property' : 'properties'}
              </p>
            </div>
            <div className="card-body" style={{ borderTop: '1px solid #f0f0f0' }}>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <button className="button button-primary" style={{ width: '100%' }}>
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="section-header" style={{ marginTop: '32px' }}>
        <h2 className="section-title">Subscription Analytics</h2>
      </div>
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Monthly Recurring Revenue</div>
                <div className="metric-value">${metrics.monthlyRevenue}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Trial Conversion Rate</div>
                <div className="metric-value">{metrics.trialConversions}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="metric-card">
              <div className="metric-icon red">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
              <div className="metric-content">
                <div className="metric-label">Monthly Churn Rate</div>
                <div className="metric-value">{metrics.churnRate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;

