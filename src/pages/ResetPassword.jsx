import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/Toast.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    // 1. Password validation
    if (!password) {
      newErrors.password = 'Please provide a new secure password.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must consist of at least 8 characters.';
    }

    // 2. Confirm password matching
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please verify.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to restore/save password
      setTimeout(() => {
        toast({
          title: 'Password Restored',
          description: 'Your security password has been successfully updated!',
          variant: 'success',
        });
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast({
        title: 'Reset Failed',
        description: 'Failed to reset password. Please request a new token.',
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
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Reset Password</h2>
        <p className="text-xs text-muted-foreground">
          Establish a new secure password for your tenant partition account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          label="New Secure Password"
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Repeat new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

        <Button type="submit" className="w-full" loading={loading}>
          Restore Password
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel & Back
        </button>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
