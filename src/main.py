import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.customer import db
from src.routes.crm import crm_bp
from datetime import datetime, timedelta
import json

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'crm-secret-key-2024'

# Enable CORS for all routes
CORS(app)

# Register blueprints
app.register_blueprint(crm_bp, url_prefix='/api/crm')

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def init_sample_data():
    """Initialize sample data for demonstration"""
    from src.models.customer import Customer, SupportTicket, AnalyticsEvent, OnboardingStep
    
    # Check if data already exists
    if Customer.query.count() > 0:
        return
    
    # Create sample customers
    customers_data = [
        {
            'name': 'Sarah Johnson',
            'email': 'sarah@oceanview.com',
            'company': 'Ocean View Rentals',
            'phone': '+1-555-0123',
            'plan': 'professional',
            'status': 'active',
            'mrr': 79.0,
            'properties_count': 3,
            'primary_location': 'Miami, FL',
            'health_score': 9.2,
            'last_login': datetime.utcnow() - timedelta(hours=2),
            'join_date': datetime.utcnow() - timedelta(days=150),
            'onboarding_status': 'completed'
        },
        {
            'name': 'Michael Chen',
            'email': 'michael@cityproperties.com',
            'company': 'City Properties LLC',
            'phone': '+1-555-0124',
            'plan': 'enterprise',
            'status': 'active',
            'mrr': 199.0,
            'properties_count': 12,
            'primary_location': 'San Francisco, CA',
            'health_score': 8.7,
            'last_login': datetime.utcnow() - timedelta(hours=1),
            'join_date': datetime.utcnow() - timedelta(days=120),
            'onboarding_status': 'completed'
        },
        {
            'name': 'Emma Rodriguez',
            'email': 'emma@beachhouse.com',
            'company': 'Beach House Escapes',
            'phone': '+1-555-0125',
            'plan': 'starter',
            'status': 'at-risk',
            'mrr': 29.0,
            'properties_count': 1,
            'primary_location': 'San Diego, CA',
            'health_score': 6.1,
            'last_login': datetime.utcnow() - timedelta(days=10),
            'join_date': datetime.utcnow() - timedelta(days=90),
            'onboarding_status': 'completed'
        },
        {
            'name': 'David Wilson',
            'email': 'david@mountainretreat.com',
            'company': 'Mountain Retreat Co',
            'phone': '+1-555-0126',
            'plan': 'professional',
            'status': 'active',
            'mrr': 79.0,
            'properties_count': 5,
            'primary_location': 'Denver, CO',
            'health_score': 8.9,
            'last_login': datetime.utcnow() - timedelta(hours=3),
            'join_date': datetime.utcnow() - timedelta(days=180),
            'onboarding_status': 'completed'
        },
        {
            'name': 'Lisa Thompson',
            'email': 'lisa@urbanstays.com',
            'company': 'Urban Stays',
            'phone': '+1-555-0127',
            'plan': 'professional',
            'status': 'churned',
            'mrr': 0.0,
            'properties_count': 2,
            'primary_location': 'Austin, TX',
            'health_score': 3.2,
            'last_login': datetime.utcnow() - timedelta(days=45),
            'join_date': datetime.utcnow() - timedelta(days=200),
            'onboarding_status': 'completed'
        },
        {
            'name': 'James Miller',
            'email': 'james@lakeside.com',
            'company': 'Lakeside Retreats',
            'phone': '+1-555-0128',
            'plan': 'starter',
            'status': 'active',
            'mrr': 29.0,
            'properties_count': 1,
            'primary_location': 'Seattle, WA',
            'health_score': 7.8,
            'last_login': datetime.utcnow() - timedelta(hours=6),
            'join_date': datetime.utcnow() - timedelta(days=30),
            'onboarding_status': 'in-progress'
        },
        {
            'name': 'Maria Garcia',
            'email': 'maria@desertlodge.com',
            'company': 'Desert Lodge Properties',
            'phone': '+1-555-0129',
            'plan': 'professional',
            'status': 'trial',
            'mrr': 0.0,
            'properties_count': 3,
            'primary_location': 'Phoenix, AZ',
            'health_score': 8.5,
            'last_login': datetime.utcnow() - timedelta(hours=4),
            'join_date': datetime.utcnow() - timedelta(days=5),
            'onboarding_status': 'in-progress'
        }
    ]
    
    customers = []
    for customer_data in customers_data:
        customer = Customer(**customer_data)
        db.session.add(customer)
        customers.append(customer)
    
    db.session.flush()  # Get customer IDs
    
    # Create sample support tickets
    tickets_data = [
        {
            'customer_id': customers[0].id,
            'title': 'API Integration Issues',
            'description': 'Having trouble connecting weather API to the guest app. Getting authentication errors.',
            'priority': 'high',
            'status': 'open',
            'category': 'technical',
            'assigned_to': 'Tech Support Team',
            'created_date': datetime.utcnow() - timedelta(hours=4)
        },
        {
            'customer_id': customers[1].id,
            'title': 'Mobile App Not Loading',
            'description': 'Guest app shows blank screen on iOS devices after latest update.',
            'priority': 'medium',
            'status': 'in-progress',
            'category': 'technical',
            'assigned_to': 'Mobile Team',
            'created_date': datetime.utcnow() - timedelta(days=1),
            'first_response_date': datetime.utcnow() - timedelta(hours=20)
        },
        {
            'customer_id': customers[2].id,
            'title': 'Billing Question',
            'description': 'Question about upgrading to Professional plan and pricing differences.',
            'priority': 'low',
            'status': 'resolved',
            'category': 'billing',
            'assigned_to': 'Customer Success',
            'created_date': datetime.utcnow() - timedelta(days=2),
            'resolved_date': datetime.utcnow() - timedelta(days=1),
            'satisfaction_rating': 5
        },
        {
            'customer_id': customers[3].id,
            'title': 'Feature Request: Custom Branding',
            'description': 'Would like to add custom logo and colors to the guest app.',
            'priority': 'medium',
            'status': 'open',
            'category': 'feature-request',
            'assigned_to': 'Product Team',
            'created_date': datetime.utcnow() - timedelta(days=3)
        },
        {
            'customer_id': customers[5].id,
            'title': 'Onboarding Assistance',
            'description': 'Need help setting up property information and local attractions.',
            'priority': 'medium',
            'status': 'in-progress',
            'category': 'onboarding',
            'assigned_to': 'Onboarding Team',
            'created_date': datetime.utcnow() - timedelta(hours=12)
        }
    ]
    
    for ticket_data in tickets_data:
        ticket = SupportTicket(**ticket_data)
        db.session.add(ticket)
    
    # Create sample analytics events
    events_data = [
        {
            'customer_id': customers[0].id,
            'event_type': 'login',
            'event_data': json.dumps({'platform': 'web', 'location': 'Miami, FL'}),
            'timestamp': datetime.utcnow() - timedelta(hours=2)
        },
        {
            'customer_id': customers[1].id,
            'event_type': 'app_usage',
            'event_data': json.dumps({'feature': 'analytics_dashboard', 'duration': 15}),
            'value': 15.0,
            'timestamp': datetime.utcnow() - timedelta(hours=1)
        },
        {
            'customer_id': customers[2].id,
            'event_type': 'support_contact',
            'event_data': json.dumps({'channel': 'email', 'category': 'billing'}),
            'timestamp': datetime.utcnow() - timedelta(days=2)
        },
        {
            'customer_id': customers[3].id,
            'event_type': 'payment',
            'event_data': json.dumps({'amount': 79.0, 'plan': 'professional'}),
            'value': 79.0,
            'timestamp': datetime.utcnow() - timedelta(days=1)
        }
    ]
    
    for event_data in events_data:
        event = AnalyticsEvent(**event_data)
        db.session.add(event)
    
    # Create sample onboarding steps
    onboarding_steps = [
        {'step_number': 1, 'step_name': 'Account Setup', 'status': 'completed'},
        {'step_number': 2, 'step_name': 'Property Configuration', 'status': 'completed'},
        {'step_number': 3, 'step_name': 'Integration Setup', 'status': 'in-progress'},
        {'step_number': 4, 'step_name': 'App Deployment', 'status': 'pending'}
    ]
    
    # Add onboarding steps for in-progress customers
    for customer in [customers[5], customers[6]]:  # James and Maria
        for i, step_data in enumerate(onboarding_steps):
            step = OnboardingStep(
                customer_id=customer.id,
                step_number=step_data['step_number'],
                step_name=step_data['step_name'],
                status=step_data['status']
            )
            if step_data['status'] == 'completed':
                step.completed_date = datetime.utcnow() - timedelta(days=i+1)
            elif step_data['status'] == 'in-progress':
                step.started_date = datetime.utcnow() - timedelta(hours=6)
            
            db.session.add(step)
    
    db.session.commit()
    print("Sample data initialized successfully!")

with app.app_context():
    db.create_all()
    init_sample_data()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

