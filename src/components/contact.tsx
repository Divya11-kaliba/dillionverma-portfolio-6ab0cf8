'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Head from 'next/head';

function Contact() {
  const { theme } = useTheme();

  // Form input state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Load reCAPTCHA script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const captchaValue = (window as any).grecaptcha?.getResponse();
    if (!captchaValue) {
      alert('Please verify that you are human!');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
        submittedAt: new Date(),
        captcha: captchaValue, // optional
      });

      alert('Form submitted successfully!');

      // Reset fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');

      // Reset captcha
      (window as any).grecaptcha?.reset();
    } catch (err) {
      console.error('Error adding document:', err);
      alert('Error submitting form. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }}
        className="w-full bg-gray-300 dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg shadow-gray-400/50 dark:shadow-gray-800/50 p-3 xs:p-4 sm:p-6"
      >
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold p-1 sm:p-2 mb-2 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-300 dark:from-gray-100 bg-clip-text text-transparent text-center sm:text-left">
          Let&apos;s work together!
        </h1>
        <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-8 mt-2 sm:mt-4 text-center sm:text-left break-words">
          I design and code beautifully simple things and I love what I do. Just simple like that!
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <input
              suppressHydrationWarning={true}
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white dark:bg-black/30 border border-gray-800 rounded-lg p-2 sm:p-3 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
              required
            />
            <input
              suppressHydrationWarning={true}
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white dark:bg-black/30 border border-gray-800 rounded-lg p-2 sm:p-3 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
              required
            />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <input
              suppressHydrationWarning={true}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-black/30 border border-gray-800 rounded-lg p-2 sm:p-3 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
              required
            />
            <input
              suppressHydrationWarning={true}
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white dark:bg-black/30 border border-gray-800 rounded-lg p-2 sm:p-3 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
            />
          </div>
          <select
            suppressHydrationWarning={true}
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-white dark:bg-black/30 border border-gray-800 rounded-lg p-2 sm:p-3 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
            required
          >
            <option value="">Select an option</option>
            <option value="web">Web Development</option>
            <option value="design">UI/UX Design</option>
            <option value="consulting">Consulting</option>
          </select>
          <textarea
            placeholder="Message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white dark:bg-black/30 border border-gray-800 rounded-lg p-2 sm:p-3 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
            required
          ></textarea>

          <div className="bg-gray-300 dark:bg-gray-900 p-2 sm:p-4 rounded-lg w-full flex justify-center">
            <div
              className="g-recaptcha scale-75 xs:scale-90 sm:scale-100 transform-origin-center "
              data-sitekey="6LdCAg4rAAAAAKGUQpzYZ7ogauSA4R297Ls8Erxi"
              data-theme={theme === 'light' ? 'light' : 'dark'}
            ></div>
          </div>

          <button
            suppressHydrationWarning={true}
            type="submit"
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors w-full text-sm sm:text-base"
          >
            {loading ? 'Submitting...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </>
  );
}

export default Contact;
