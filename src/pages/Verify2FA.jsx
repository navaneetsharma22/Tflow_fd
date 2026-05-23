import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Verify2FA = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  // Auto-countdown resend timer
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle number input shifting UX
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next box if digit entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Auto-focus backward on Backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      toast({
        title: 'Incomplete Code',
        description: 'Please fill out all 6 digits of your authentication code.',
        variant: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      // Perform mock verification
      setTimeout(() => {
        toast({
          title: '2FA Confirmed',
          description: 'Multi-factor authentication successfully verified!',
          variant: 'success',
        });
        navigate('/');
      }, 1000);
    } catch (err) {
      toast({
        title: 'Verification Failed',
        description: 'The authentication code entered is invalid or has expired.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(60);
    toast({
      title: 'Passcode Resent',
      description: 'A new 2FA verification code has been dispatched to your device.',
      variant: 'primary',
    });
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
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Security Verification</h2>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Please enter the 6-digit authentication passcode sent to your registered device.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        {/* 6-Digit Shift Box Grid */}
        <div className="flex justify-between gap-2.5">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
          ))}
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Verify Session
        </Button>
      </form>

      {/* Footer controls */}
      <div className="flex flex-col items-center justify-center gap-3 text-xs">
        {timer > 0 ? (
          <span className="text-muted-foreground">
            Resend passcode in <span className="text-foreground font-semibold">{timer}s</span>
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-orange-500 hover:underline font-semibold cursor-pointer"
          >
            Resend Verification Code
          </button>
        )}

        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sign In
        </button>
      </div>
    </motion.div>
  );
};

export default Verify2FA;
