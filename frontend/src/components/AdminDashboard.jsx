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
        return 'bg-green-500';
      case 'read':
        return 'bg-yellow-500';
      case 'responded':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <LoadingSection title="Loading submissions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <ErrorMessage message={error} onRetry={fetchSubmissions} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <Button onClick={fetchSubmissions} className="bg-teal-500 hover:bg-teal-600">
            Refresh
          </Button>
        </div>

        <div className="grid gap-6">
          {submissions.length === 0 ? (
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No contact submissions yet.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} className="bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {submission.name}
                      </CardTitle>
                      <p className="text-teal-400 text-sm">{submission.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(submission.status)} text-white`}>
                        {submission.status}
                      </Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(submission.submittedAt)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Subject:</h4>
                      <p className="text-white">{submission.subject}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Message:</h4>
                      <p className="text-gray-300 bg-gray-900/50 p-3 rounded-lg">
                        {submission.message}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {submission.status === 'new' && (
                        <Button
                          onClick={() => updateStatus(submission.id, 'read')}
                          size="sm"
                          variant="outline"
                          className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          Mark as Read
                        </Button>
                      )}
                      {submission.status === 'read' && (
                        <Button
                          onClick={() => updateStatus(submission.id, 'responded')}
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                        >
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