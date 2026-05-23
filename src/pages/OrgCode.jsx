import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/Toast.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Building2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const OrgCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!code) {
      setError('Please provide an organization join code.');
      return;
    }

    if (code.trim().length < 4) {
      setError('Organization join code must contain at least 4 characters.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API association
      setTimeout(() => {
        toast({
          title: 'Workspace Associated',
          description: 'Successfully joined your new tenant organization partition!',
          variant: 'success',
        });
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast({
        title: 'Connection Failed',
        description: 'The organization code entered is invalid or expired.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
          <Building2 className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Join Organization</h2>
        <p className="text-xs text-muted-foreground">
          Enter an alphanumeric invite code to hook into your team's partition.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Organization Invite Code"
          placeholder="e.g. ORG-9281"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          error={error}
        />

        <Button type="submit" className="w-full" loading={loading}>
          Link Workspace
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sign In
        </button>
      </div>
    </motion.div>
  );
};

export default OrgCode;
