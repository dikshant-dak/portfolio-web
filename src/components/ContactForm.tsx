'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error inline
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      // Simulate API submit delay (e.g. sending through custom email queue or serverless endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full border border-zinc-800 bg-primary/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
      <h3 className="text-xl font-heading font-bold text-white mb-2">Send a Message</h3>
      <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
        Have a project in mind or want to discuss full-time roles? Drop details below, and I will get back to you within 24 hours.
      </p>

      {status === 'success' ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-white">Message Dispatched!</h4>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
              Thank you for reaching out. The request has been queued successfully, and I will contact you shortly at the email provided.
            </p>
            <button
              onClick={() => setStatus('idle')}
              suppressHydrationWarning
              className="text-xs font-semibold text-emerald-400 underline mt-4 hover:text-white transition-colors cursor-pointer"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Failed to send the message. Please check the network and try again.</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'submitting'}
              suppressHydrationWarning
              className={`w-full bg-zinc-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors ${
                errors.name ? 'border-red-500/50' : 'border-zinc-800'
              }`}
              placeholder="e.g. Alex Morgan"
            />
            {errors.name && <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              suppressHydrationWarning
              className={`w-full bg-zinc-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors ${
                errors.email ? 'border-red-500/50' : 'border-zinc-800'
              }`}
              placeholder="e.g. alex@company.com"
            />
            {errors.email && <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
              Message / Project Scope
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'submitting'}
              suppressHydrationWarning
              className={`w-full bg-zinc-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none ${
                errors.message ? 'border-red-500/50' : 'border-zinc-800'
              }`}
              placeholder="Describe what you are building or outline the vacancy..."
            />
            {errors.message && <span className="text-[11px] text-red-400 mt-1 block">{errors.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            suppressHydrationWarning
            className="btn-transition w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-emerald-500 hover:text-white py-3 px-4 rounded-lg text-sm font-semibold uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Queuing Message...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
