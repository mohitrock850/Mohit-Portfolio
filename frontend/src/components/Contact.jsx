import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import api from '../api/api';
import AnimatedSection from './AnimatedSection';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      alert('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatedSection id="contact" className="py-20 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Get in Touch</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Let's build something together.</p>
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass p-8 space-y-6 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* floating labels */}
        {['name', 'email', 'subject'].map((field) => (
          <div key={field} className="relative">
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b border-gray-300 dark:border-white/20 py-2 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-transparent"
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary-400 capitalize">
              {field}
            </label>
          </div>
        ))}

        <div className="relative">
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full bg-transparent border-b border-gray-300 dark:border-white/20 py-2 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-transparent resize-none"
          />
          <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary-400">
            Message
          </label>
        </div>

        <button
          type="submit"
          disabled={sending || success}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
        >
          {sending ? <><Loader2 className="animate-spin" size={18} /> Sending...</> :
           success ? <><CheckCircle size={18} /> Sent!</> :
           <><Send size={18} /> Send Message</>}
        </button>
      </motion.form>
    </AnimatedSection>
  );
};

export default Contact;