import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { portfolioService } from '../services/api';
import { LoadingSection, ErrorMessage } from './Loading';
import { Mail, Clock, User, Eye, ArrowLeft, Home, RefreshCw, MessageSquare, TrendingUp, Users, Activity, Filter } from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioService.getContactSubmissions();
      setSubmissions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (submissionId, status) => {
    try {
      await portfolioService.updateContactStatus(submissionId, status);
      await fetchSubmissions(); // Refresh the list
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'read':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'responded':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    const total = submissions.length;
    const newCount = submissions.filter(s => s.status === 'new').length;
    const readCount = submissions.filter(s => s.status === 'read').length;
    const respondedCount = submissions.filter(s => s.status === 'responded').length;
    
    return { total, newCount, readCount, respondedCount };
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === 'all') return true;
    return submission.status === filterStatus;
  });

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
        <LoadingSection title="Loading submissions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
        <ErrorMessage message={error} onRetry={fetchSubmissions} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Enhanced Header */}
      <div className="bg-gray-900/50 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800/50"
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
              <div className="h-6 w-px bg-gray-700"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={fetchSubmissions} 
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Messages</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-teal-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Messages</p>
                  <p className="text-2xl font-bold text-white">{stats.newCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Read Messages</p>
                  <p className="text-2xl font-bold text-white">{stats.readCount}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Responded</p>
                  <p className="text-2xl font-bold text-white">{stats.respondedCount}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filter Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">Filter by status:</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                    className={filterStatus === 'all' ? 'bg-teal-500 hover:bg-teal-600' : 'border-gray-600 hover:border-teal-500'}
                  >
                    All ({stats.total})
                  </Button>
                  <Button
                    variant={filterStatus === 'new' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('new')}
                    className={filterStatus === 'new' ? 'bg-green-500 hover:bg-green-600' : 'border-gray-600 hover:border-green-500'}
                  >
                    New ({stats.newCount})
                  </Button>
                  <Button
                    variant={filterStatus === 'read' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('read')}
                    className={filterStatus === 'read' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-gray-600 hover:border-yellow-500'}
                  >
                    Read ({stats.readCount})
                  </Button>
                  <Button
                    variant={filterStatus === 'responded' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('responded')}
                    className={filterStatus === 'responded' ? 'bg-blue-500 hover:bg-blue-600' : 'border-gray-600 hover:border-blue-500'}
                  >
                    Responded ({stats.respondedCount})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Messages Section */}
        <div className="space-y-6">
          {filteredSubmissions.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50">
              <CardContent className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg">
                    {filterStatus === 'all' 
                      ? 'No contact submissions yet.' 
                      : `No ${filterStatus} messages found.`
                    }
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Messages will appear here when visitors submit the contact form.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-teal-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{submission.name}</CardTitle>
                        <p className="text-teal-400 font-medium">{submission.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(submission.status)} border`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{formatDate(submission.submittedAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Subject:</h4>
                      <p className="text-white text-lg">{submission.subject}</p>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Message:</h4>
                      <p className="text-gray-300 leading-relaxed">{submission.message}</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      {submission.status === 'new' && (
                        <Button
                          onClick={() => updateStatus(submission.id, 'read')}
                          size="sm"
                          className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30 hover:text-yellow-300"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      {submission.status === 'read' && (
                        <Button
                          onClick={() => updateStatus(submission.id, 'responded')}
                          size="sm"
                          className="bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/30 hover:text-blue-300"
                        >
                          <Activity className="h-4 w-4 mr-2" />
                          Mark as Responded
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;