import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/Toast.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { KeyRound, ArrowLeft, MailCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Input Validation check
    if (!email) {
      setError('Please provide your account email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid formatting email address.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to dispatch reset token link
      setTimeout(() => {
        setSuccess(true);
        toast({
          title: 'Recovery Email Dispatched',
          description: 'A password recovery link has been dispatched to your mailbox.',
          variant: 'success',
        });
      }, 1000);
    } catch (err) {
      toast({
        title: 'Request Failed',
        description: 'Failed to process password recovery. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 text-center"
      >
        <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
          <MailCheck className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight">Check Your Mailbox</h2>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            We have dispatched password restoration coordinates to <span className="text-foreground font-semibold">{email}</span>.
          </p>
        </div>
        <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
          Return to Sign In
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
          <KeyRound className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Forgot Password?</h2>
        <p className="text-xs text-muted-foreground">
          No worries. Enter your registered email and we'll dispatch a secure recovery token link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Registered Email Address"
          placeholder="e.g. administrator@taskflow.so"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <Button type="submit" className="w-full" loading={loading}>
          Send Reset Link
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Sign In
        </button>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
