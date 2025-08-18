'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Clock, 
  Brain, 
  Users, 
  ThumbsUp, 
  Activity, 
  AlertCircle,
  BarChart2,
  Settings,
  UserCog,
  Headphones,
  MessageSquare,
  Download
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real data later
  const metrics = {
    liveCalls: 24,
    avgResolutionTime: '3.2 min',
    aiSuccessRate: '78%',
    agentAvailability: '42/50',
    customerSatisfaction: '4.8/5'
  };

  const recentCalls = [
    { id: 1, caller: 'Customer 1', intent: 'Billing Query', status: 'Resolved', time: '2 min ago' },
    { id: 2, caller: 'Customer 2', intent: 'Technical Support', status: 'In Progress', time: '5 min ago' },
    { id: 3, caller: 'Customer 3', intent: 'Account Update', status: 'Escalated', time: '8 min ago' }
  ];

  const agents = [
    { id: 1, name: 'John Doe', status: 'On Call', focus: 'High', performance: '95%' },
    { id: 2, name: 'Jane Smith', status: 'Idle', focus: 'Medium', performance: '88%' },
    { id: 3, name: 'Mike Johnson', status: 'Post-call', focus: 'Low', performance: '92%' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Dashboard Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('agents')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'agents' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Agent Management
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                System Settings
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                <UserCog className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <MetricCard 
            icon={<Phone className="w-6 h-6" />}
            title="Live Calls"
            value={metrics.liveCalls}
            color="bg-blue-500"
          />
          <MetricCard 
            icon={<Clock className="w-6 h-6" />}
            title="Avg Resolution Time"
            value={metrics.avgResolutionTime}
            color="bg-green-500"
          />
          <MetricCard 
            icon={<Brain className="w-6 h-6" />}
            title="AI Success Rate"
            value={metrics.aiSuccessRate}
            color="bg-purple-500"
          />
          <MetricCard 
            icon={<Users className="w-6 h-6" />}
            title="Agent Availability"
            value={metrics.agentAvailability}
            color="bg-orange-500"
          />
          <MetricCard 
            icon={<ThumbsUp className="w-6 h-6" />}
            title="Customer Satisfaction"
            value={metrics.customerSatisfaction}
            color="bg-pink-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Live Activity Feed
              </h2>
              <div className="space-y-4">
                {recentCalls.map(call => (
                  <div key={call.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{call.caller}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        call.status === 'Resolved' ? 'bg-green-500' : 
                        call.status === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {call.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {call.intent} • {call.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agent Monitoring */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Headphones className="w-5 h-5 mr-2" />
                Agent Monitoring
              </h2>
              <div className="space-y-4">
                {agents.map(agent => (
                  <div key={agent.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{agent.name}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        agent.status === 'On Call' ? 'bg-blue-500' : 
                        agent.status === 'Idle' ? 'bg-gray-500' : 'bg-purple-500'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>
                        <span className="text-gray-400">Focus:</span>
                        <span className="ml-2">{agent.focus}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Performance:</span>
                        <span className="ml-2">{agent.performance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Performance */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Performance Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Success vs Fail Cases</h3>
                  <div className="h-40 bg-gray-600 rounded">
                    {/* Add chart here */}
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Intent Resolution</h3>
                  <div className="h-40 bg-gray-600 rounded">
                    {/* Add chart here */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                System Health
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Routing System</span>
                    <span className="text-green-500">Healthy</span>
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>AI Confidence</span>
                    <span className="text-yellow-500">Medium</span>
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Agent Activity</span>
                    <span className="text-green-500">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, color }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`${color} p-6 rounded-lg shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </motion.div>
  );
} 