import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Progress } from './components/ui/progress'
import { Separator } from './components/ui/separator'
import { 
  Users, 
  DollarSign, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  Filter, 
  Plus, 
  Download,
  MoreHorizontal,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Settings,
  Bell,
  LogOut
} from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [customers, setCustomers] = useState([])
  const [tickets, setTickets] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [customersRes, ticketsRes, analyticsRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/tickets'),
        fetch('/api/analytics')
      ])
      
      if (customersRes.ok) setCustomers(await customersRes.json())
      if (ticketsRes.ok) setTickets(await ticketsRes.json())
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getHealthColor = (score) => {
    if (score >= 8) return 'bg-green-500'
    if (score >= 6) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getStatusBadge = (status) => {
    const variants = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'at-risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'critical': 'bg-red-100 text-red-800 border-red-200',
      'inactive': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return variants[status] || variants['inactive']
  }

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CRM Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MyAirbnbApp CRM</h1>
                <p className="text-sm text-gray-500">Customer Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-gray-500">admin@myairbnbapp.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('dashboard')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'customers' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('customers')}
            >
              <Users className="h-4 w-4 mr-2" />
              Customers
            </Button>
            <Button
              variant={activeTab === 'support' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('support')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </Button>
            <Button
              variant={activeTab === 'onboarding' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('onboarding')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Onboarding
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('analytics')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-600">Monitor your customer success metrics and platform performance</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">247</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$18,450</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+8%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+3</span> new today
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Health Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.4</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+0.3</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                    <CardDescription>Monthly recurring revenue and customer growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Revenue chart visualization</p>
                        <p className="text-sm text-gray-400">Interactive chart would be rendered here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Health Distribution</CardTitle>
                    <CardDescription>Current health status of all customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Healthy</span>
                        </div>
                        <span className="text-sm font-medium">156 customers</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">At Risk</span>
                        </div>
                        <span className="text-sm font-medium">67 customers</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Critical</span>
                        </div>
                        <span className="text-sm font-medium">24 customers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest customer and support activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'signup', customer: 'David Wilson', plan: 'Professional', time: '2 hours ago' },
                      { type: 'ticket', customer: 'Sarah Johnson', issue: 'API Integration Issues', time: '4 hours ago' },
                      { type: 'payment', customer: 'Michael Chen', amount: '$199', time: '6 hours ago' },
                      { type: 'upgrade', customer: 'Emma Rodriguez', plan: 'Enterprise', time: '1 day ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          {activity.type === 'signup' && <User className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'ticket' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'upgrade' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.customer}</p>
                          <p className="text-xs text-gray-500">
                            {activity.plan && `${activity.plan} plan`}
                            {activity.issue && activity.issue}
                            {activity.amount && `Payment received: ${activity.amount}`}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
                  <p className="text-gray-600">Manage and monitor your customer base</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search customers..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                          <th className="text-left p-4 font-medium text-gray-900">Plan</th>
                          <th className="text-left p-4 font-medium text-gray-900">Status</th>
                          <th className="text-left p-4 font-medium text-gray-900">Health</th>
                          <th className="text-left p-4 font-medium text-gray-900">MRR</th>
                          <th className="text-left p-4 font-medium text-gray-900">Properties</th>
                          <th className="text-left p-4 font-medium text-gray-900">Last Login</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {customers.map((customer) => (
                          <tr key={customer.id} className="hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-gray-900">{customer.name}</p>
                                  <p className="text-sm text-gray-500">{customer.email}</p>
                                  <p className="text-xs text-gray-400">{customer.company}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{customer.plan}</Badge>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusBadge(customer.status)}>
                                {customer.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${getHealthColor(customer.health_score)}`}></div>
                                <span className="text-sm font-medium">{customer.health_score}/10</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-medium">${customer.mrr}</span>
                            </td>
                            <td className="p-4">
                              <span className="text-sm">{customer.properties_count}</span>
                            </td>
                            <td className="p-4">
                              <span className="text-sm text-gray-500">{customer.last_login}</span>
                            </td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
                  <p className="text-gray-600">Manage customer support requests and issues</p>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>

              {/* Support Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">Open Tickets</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">In Progress</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Resolved Today</p>
                        <p className="text-2xl font-bold">15</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Avg Response</p>
                        <p className="text-2xl font-bold">2.4h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tickets List */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tickets</CardTitle>
                  <CardDescription>Latest support requests from customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          {getPriorityIcon(ticket.priority)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{ticket.title}</p>
                          <p className="text-sm text-gray-500">Customer: {ticket.customer_name}</p>
                          <p className="text-xs text-gray-400">Created: {ticket.created_at} • Updated: {ticket.updated_at}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadge(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'onboarding' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Customer Onboarding</h2>
                <p className="text-gray-600">Track customer onboarding progress and success rates</p>
              </div>

              {/* Onboarding Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Pipeline</CardTitle>
                  <CardDescription>Current customers in each onboarding stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { stage: 'Account Setup', count: 12, color: 'bg-blue-500' },
                      { stage: 'Property Config', count: 8, color: 'bg-yellow-500' },
                      { stage: 'Integration', count: 5, color: 'bg-orange-500' },
                      { stage: 'Deployment', count: 3, color: 'bg-green-500' }
                    ].map((stage, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className={`w-12 h-12 ${stage.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                          <span className="text-white font-bold">{stage.count}</span>
                        </div>
                        <p className="font-medium">{stage.stage}</p>
                        <p className="text-sm text-gray-500">{stage.count} customers</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Success Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <p className="text-sm text-gray-500">Customers completing onboarding</p>
                    <Progress value={87} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Avg Time to Complete</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">5.2</div>
                    <p className="text-sm text-gray-500">Days average completion time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Drop-off Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-600">13%</div>
                    <p className="text-sm text-gray-500">Customers not completing</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
                <p className="text-gray-600">Business intelligence and performance metrics</p>
              </div>

              {/* Key Business Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Acquisition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+23%</div>
                    <p className="text-sm text-gray-500">Monthly growth rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Churn Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-sm text-gray-500">Monthly churn rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Avg LTV</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$2,340</div>
                    <p className="text-sm text-gray-500">Customer lifetime value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Support Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.6/5</div>
                    <p className="text-sm text-gray-500">Average rating</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Starter Plan</span>
                        <span className="font-medium">$4,350 (24%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Professional Plan</span>
                        <span className="font-medium">$9,870 (53%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Enterprise Plan</span>
                        <span className="font-medium">$4,230 (23%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Support Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>First Contact Resolution</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Response Time</span>
                        <span className="font-medium">2.4 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Customer Satisfaction</span>
                        <span className="font-medium">4.6/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

