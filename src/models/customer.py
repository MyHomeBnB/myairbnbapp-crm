from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Customer(db.Model):
    __tablename__ = 'customers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    company = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    
    # Subscription details
    plan = db.Column(db.String(50), nullable=False, default='starter')  # starter, professional, enterprise
    status = db.Column(db.String(20), nullable=False, default='active')  # active, at-risk, churned, trial
    mrr = db.Column(db.Float, default=0.0)  # Monthly recurring revenue
    
    # Property information
    properties_count = db.Column(db.Integer, default=0)
    primary_location = db.Column(db.String(100))
    
    # Health and engagement metrics
    health_score = db.Column(db.Float, default=5.0)  # 1-10 scale
    last_login = db.Column(db.DateTime)
    app_usage_score = db.Column(db.Float, default=0.0)
    support_satisfaction = db.Column(db.Float, default=5.0)
    
    # Dates
    join_date = db.Column(db.DateTime, default=datetime.utcnow)
    trial_end_date = db.Column(db.DateTime)
    last_payment_date = db.Column(db.DateTime)
    
    # Onboarding
    onboarding_status = db.Column(db.String(20), default='pending')  # pending, in-progress, completed, failed
    onboarding_step = db.Column(db.Integer, default=1)  # Current step in onboarding process
    onboarding_completed_date = db.Column(db.DateTime)
    
    # Relationships
    support_tickets = db.relationship('SupportTicket', backref='customer_ref', lazy=True)
    analytics_events = db.relationship('AnalyticsEvent', backref='customer_ref', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'company': self.company,
            'phone': self.phone,
            'plan': self.plan,
            'status': self.status,
            'mrr': self.mrr,
            'properties_count': self.properties_count,
            'primary_location': self.primary_location,
            'health_score': self.health_score,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'app_usage_score': self.app_usage_score,
            'support_satisfaction': self.support_satisfaction,
            'join_date': self.join_date.isoformat() if self.join_date else None,
            'trial_end_date': self.trial_end_date.isoformat() if self.trial_end_date else None,
            'last_payment_date': self.last_payment_date.isoformat() if self.last_payment_date else None,
            'onboarding_status': self.onboarding_status,
            'onboarding_step': self.onboarding_step,
            'onboarding_completed_date': self.onboarding_completed_date.isoformat() if self.onboarding_completed_date else None
        }

class SupportTicket(db.Model):
    __tablename__ = 'support_tickets'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(20), default='medium')  # low, medium, high, urgent
    status = db.Column(db.String(20), default='open')  # open, in-progress, resolved, closed
    category = db.Column(db.String(50))  # technical, billing, onboarding, feature-request
    
    # Assignment and tracking
    assigned_to = db.Column(db.String(100))  # Staff member assigned
    resolution_time = db.Column(db.Integer)  # Minutes to resolve
    first_response_time = db.Column(db.Integer)  # Minutes to first response
    satisfaction_rating = db.Column(db.Integer)  # 1-5 rating from customer
    
    # Dates
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resolved_date = db.Column(db.DateTime)
    first_response_date = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'customer_name': self.customer_ref.name if self.customer_ref else None,
            'title': self.title,
            'description': self.description,
            'priority': self.priority,
            'status': self.status,
            'category': self.category,
            'assigned_to': self.assigned_to,
            'resolution_time': self.resolution_time,
            'first_response_time': self.first_response_time,
            'satisfaction_rating': self.satisfaction_rating,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'updated_date': self.updated_date.isoformat() if self.updated_date else None,
            'resolved_date': self.resolved_date.isoformat() if self.resolved_date else None,
            'first_response_date': self.first_response_date.isoformat() if self.first_response_date else None
        }

class AnalyticsEvent(db.Model):
    __tablename__ = 'analytics_events'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    
    event_type = db.Column(db.String(50), nullable=False)  # login, app_usage, payment, support_contact
    event_data = db.Column(db.Text)  # JSON data for event details
    value = db.Column(db.Float)  # Numeric value if applicable
    
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'event_type': self.event_type,
            'event_data': json.loads(self.event_data) if self.event_data else None,
            'value': self.value,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

class OnboardingStep(db.Model):
    __tablename__ = 'onboarding_steps'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    
    step_number = db.Column(db.Integer, nullable=False)
    step_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, in-progress, completed, skipped
    
    started_date = db.Column(db.DateTime)
    completed_date = db.Column(db.DateTime)
    notes = db.Column(db.Text)
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'step_number': self.step_number,
            'step_name': self.step_name,
            'status': self.status,
            'started_date': self.started_date.isoformat() if self.started_date else None,
            'completed_date': self.completed_date.isoformat() if self.completed_date else None,
            'notes': self.notes
        }

