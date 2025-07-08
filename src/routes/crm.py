from flask import Blueprint, request, jsonify
from src.models.customer import db, Customer, SupportTicket, AnalyticsEvent, OnboardingStep
from datetime import datetime, timedelta
from sqlalchemy import func, desc
import json

crm_bp = Blueprint('crm', __name__)

# Dashboard endpoints
@crm_bp.route('/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get key dashboard statistics"""
    try:
        # Customer stats
        total_customers = Customer.query.count()
        active_customers = Customer.query.filter_by(status='active').count()
        at_risk_customers = Customer.query.filter_by(status='at-risk').count()
        churned_customers = Customer.query.filter_by(status='churned').count()
        
        # Revenue stats
        monthly_revenue = db.session.query(func.sum(Customer.mrr)).filter(
            Customer.status.in_(['active', 'trial'])
        ).scalar() or 0
        
        # Support stats
        open_tickets = SupportTicket.query.filter_by(status='open').count()
        total_tickets = SupportTicket.query.count()
        
        # Health score
        avg_health = db.session.query(func.avg(Customer.health_score)).filter(
            Customer.status == 'active'
        ).scalar() or 0
        
        # Churn rate (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_churned = Customer.query.filter(
            Customer.status == 'churned',
            Customer.updated_date >= thirty_days_ago
        ).count()
        churn_rate = (recent_churned / total_customers * 100) if total_customers > 0 else 0
        
        return jsonify({
            'total_customers': total_customers,
            'active_customers': active_customers,
            'at_risk_customers': at_risk_customers,
            'churned_customers': churned_customers,
            'monthly_revenue': round(monthly_revenue, 2),
            'open_tickets': open_tickets,
            'total_tickets': total_tickets,
            'avg_health_score': round(avg_health, 1),
            'churn_rate': round(churn_rate, 1)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/dashboard/revenue-data', methods=['GET'])
def get_revenue_data():
    """Get revenue data for charts"""
    try:
        # Mock data for demonstration - in real app, calculate from actual data
        revenue_data = [
            {'month': 'Jan', 'revenue': 12400, 'customers': 156},
            {'month': 'Feb', 'revenue': 14200, 'customers': 178},
            {'month': 'Mar', 'revenue': 15800, 'customers': 195},
            {'month': 'Apr', 'revenue': 16900, 'customers': 212},
            {'month': 'May', 'revenue': 17600, 'customers': 231},
            {'month': 'Jun', 'revenue': 18450, 'customers': 247}
        ]
        return jsonify(revenue_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/dashboard/health-distribution', methods=['GET'])
def get_health_distribution():
    """Get customer health distribution"""
    try:
        healthy = Customer.query.filter(Customer.health_score >= 8).count()
        at_risk = Customer.query.filter(
            Customer.health_score >= 6, 
            Customer.health_score < 8
        ).count()
        critical = Customer.query.filter(Customer.health_score < 6).count()
        
        return jsonify([
            {'name': 'Healthy', 'value': healthy, 'color': '#10b981'},
            {'name': 'At Risk', 'value': at_risk, 'color': '#f59e0b'},
            {'name': 'Critical', 'value': critical, 'color': '#ef4444'}
        ])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Customer management endpoints
@crm_bp.route('/customers', methods=['GET'])
def get_customers():
    """Get all customers with filtering and pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 50, type=int)
        search = request.args.get('search', '')
        status_filter = request.args.get('status', '')
        plan_filter = request.args.get('plan', '')
        
        query = Customer.query
        
        # Apply filters
        if search:
            query = query.filter(
                db.or_(
                    Customer.name.contains(search),
                    Customer.email.contains(search),
                    Customer.company.contains(search)
                )
            )
        
        if status_filter:
            query = query.filter_by(status=status_filter)
            
        if plan_filter:
            query = query.filter_by(plan=plan_filter)
        
        # Order by health score (lowest first for attention)
        query = query.order_by(Customer.health_score.asc())
        
        customers = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'customers': [customer.to_dict() for customer in customers.items],
            'total': customers.total,
            'pages': customers.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Get detailed customer information"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        
        # Get recent support tickets
        recent_tickets = SupportTicket.query.filter_by(customer_id=customer_id)\
            .order_by(desc(SupportTicket.created_date)).limit(5).all()
        
        # Get recent analytics events
        recent_events = AnalyticsEvent.query.filter_by(customer_id=customer_id)\
            .order_by(desc(AnalyticsEvent.timestamp)).limit(10).all()
        
        # Get onboarding steps
        onboarding_steps = OnboardingStep.query.filter_by(customer_id=customer_id)\
            .order_by(OnboardingStep.step_number).all()
        
        customer_data = customer.to_dict()
        customer_data['recent_tickets'] = [ticket.to_dict() for ticket in recent_tickets]
        customer_data['recent_events'] = [event.to_dict() for event in recent_events]
        customer_data['onboarding_steps'] = [step.to_dict() for step in onboarding_steps]
        
        return jsonify(customer_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """Update customer information"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        data = request.get_json()
        
        # Update allowed fields
        allowed_fields = [
            'name', 'email', 'company', 'phone', 'plan', 'status', 
            'mrr', 'properties_count', 'primary_location', 'health_score'
        ]
        
        for field in allowed_fields:
            if field in data:
                setattr(customer, field, data[field])
        
        db.session.commit()
        return jsonify(customer.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Support ticket endpoints
@crm_bp.route('/support/tickets', methods=['GET'])
def get_support_tickets():
    """Get support tickets with filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status_filter = request.args.get('status', '')
        priority_filter = request.args.get('priority', '')
        
        query = SupportTicket.query
        
        if status_filter:
            query = query.filter_by(status=status_filter)
            
        if priority_filter:
            query = query.filter_by(priority=priority_filter)
        
        # Order by priority and creation date
        priority_order = db.case(
            (SupportTicket.priority == 'urgent', 1),
            (SupportTicket.priority == 'high', 2),
            (SupportTicket.priority == 'medium', 3),
            (SupportTicket.priority == 'low', 4),
            else_=5
        )
        
        query = query.order_by(priority_order, desc(SupportTicket.created_date))
        
        tickets = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'tickets': [ticket.to_dict() for ticket in tickets.items],
            'total': tickets.total,
            'pages': tickets.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/support/tickets', methods=['POST'])
def create_support_ticket():
    """Create a new support ticket"""
    try:
        data = request.get_json()
        
        ticket = SupportTicket(
            customer_id=data['customer_id'],
            title=data['title'],
            description=data.get('description', ''),
            priority=data.get('priority', 'medium'),
            category=data.get('category', 'general'),
            assigned_to=data.get('assigned_to')
        )
        
        db.session.add(ticket)
        db.session.commit()
        
        return jsonify(ticket.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/support/tickets/<int:ticket_id>', methods=['PUT'])
def update_support_ticket(ticket_id):
    """Update support ticket"""
    try:
        ticket = SupportTicket.query.get_or_404(ticket_id)
        data = request.get_json()
        
        # Update allowed fields
        allowed_fields = [
            'title', 'description', 'priority', 'status', 'category', 
            'assigned_to', 'satisfaction_rating'
        ]
        
        for field in allowed_fields:
            if field in data:
                setattr(ticket, field, data[field])
        
        # Set resolution date if status changed to resolved
        if data.get('status') == 'resolved' and ticket.resolved_date is None:
            ticket.resolved_date = datetime.utcnow()
            if ticket.created_date:
                ticket.resolution_time = int(
                    (ticket.resolved_date - ticket.created_date).total_seconds() / 60
                )
        
        db.session.commit()
        return jsonify(ticket.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Onboarding endpoints
@crm_bp.route('/onboarding/stats', methods=['GET'])
def get_onboarding_stats():
    """Get onboarding pipeline statistics"""
    try:
        new_signups = Customer.query.filter_by(onboarding_status='pending').count()
        in_progress = Customer.query.filter_by(onboarding_status='in-progress').count()
        completed = Customer.query.filter_by(onboarding_status='completed').count()
        failed = Customer.query.filter_by(onboarding_status='failed').count()
        
        total = new_signups + in_progress + completed + failed
        success_rate = (completed / total * 100) if total > 0 else 0
        
        return jsonify({
            'new_signups': new_signups,
            'in_progress': in_progress,
            'completed': completed,
            'failed': failed,
            'success_rate': round(success_rate, 1)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/onboarding/customers', methods=['GET'])
def get_onboarding_customers():
    """Get customers in onboarding process"""
    try:
        status_filter = request.args.get('status', 'in-progress')
        
        customers = Customer.query.filter_by(onboarding_status=status_filter)\
            .order_by(Customer.join_date.desc()).all()
        
        return jsonify([customer.to_dict() for customer in customers])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Analytics endpoints
@crm_bp.route('/analytics/events', methods=['POST'])
def track_analytics_event():
    """Track a new analytics event"""
    try:
        data = request.get_json()
        
        event = AnalyticsEvent(
            customer_id=data['customer_id'],
            event_type=data['event_type'],
            event_data=json.dumps(data.get('event_data', {})),
            value=data.get('value')
        )
        
        db.session.add(event)
        db.session.commit()
        
        return jsonify(event.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@crm_bp.route('/analytics/customer-metrics', methods=['GET'])
def get_customer_metrics():
    """Get customer analytics metrics"""
    try:
        # Customer acquisition by month
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        new_customers = Customer.query.filter(
            Customer.join_date >= thirty_days_ago
        ).count()
        
        # Churn metrics
        churned_customers = Customer.query.filter(
            Customer.status == 'churned'
        ).count()
        total_customers = Customer.query.count()
        churn_rate = (churned_customers / total_customers * 100) if total_customers > 0 else 0
        
        # Average LTV calculation (simplified)
        avg_mrr = db.session.query(func.avg(Customer.mrr)).filter(
            Customer.status == 'active'
        ).scalar() or 0
        avg_ltv = avg_mrr * 24  # Simplified: 24 months average
        
        return jsonify({
            'new_customers_30d': new_customers,
            'churn_rate': round(churn_rate, 1),
            'avg_ltv': round(avg_ltv, 2),
            'total_customers': total_customers
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

