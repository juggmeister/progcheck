/**
 * Admin Submissions Component
 * 
 * This component allows admins to view and manage resource submissions.
 * 
 * To use this:
 * 1. Set up authentication (Supabase Auth or your preferred method)
 * 2. Protect this route with admin-only access
 * 3. Import and use this component in an admin page
 * 
 * Example usage:
 * ```tsx
 * import AdminSubmissions from '@/components/AdminSubmissions';
 * 
 * function AdminPage() {
 *   return (
 *     <div className="container mx-auto p-8">
 *       <h1>Admin Dashboard</h1>
 *       <AdminSubmissions />
 *     </div>
 *   );
 * }
 * ```
 */

import { useState, useEffect } from 'react';
import { getAllSubmissions, updateSubmissionStatus, ResourceSubmission } from '@/services/submissionService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<ResourceSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateSubmissionStatus(id, status);
      toast({
        title: 'Success',
        description: `Submission ${status} successfully`,
      });
      loadSubmissions(); // Reload to show updated status
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update submission status',
        variant: 'destructive',
      });
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              filter === status
                ? 'border-b-2 border-foreground text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {status}
            {status !== 'all' && (
              <span className="ml-2 text-sm">
                ({submissions.filter(s => s.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No submissions found
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="glass-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{submission.name}</CardTitle>
                    <CardDescription>{submission.category}</CardDescription>
                  </div>
                  {getStatusBadge(submission.status || 'pending')}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{submission.description}</p>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {submission.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <span className="text-muted-foreground">{submission.address}</span>
                    </div>
                  )}
                  {submission.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${submission.phone}`} className="text-muted-foreground hover:text-foreground">
                        {submission.phone}
                      </a>
                    </div>
                  )}
                  {submission.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${submission.email}`} className="text-muted-foreground hover:text-foreground">
                        {submission.email}
                      </a>
                    </div>
                  )}
                  {submission.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={submission.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {submission.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Submitter Info */}
                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground mb-2">
                    Submitted by: <span className="font-medium">{submission.submitter_name}</span> ({submission.submitter_email})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Submitted: {new Date(submission.created_at || '').toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                {submission.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(submission.id!, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(submission.id!, 'rejected')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminSubmissions;

