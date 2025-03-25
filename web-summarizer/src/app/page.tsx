'use client';

import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLink, FaSun, FaMoon, FaPaperPlane, FaExclamationCircle, FaRedoAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { HTMLAttributes } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastSummarizedUrl, setLastSummarizedUrl] = useState('');

  const handleSummarize = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/summarize', { url });
      setSummary(response.data.summary);
      setLastSummarizedUrl(url);
    } catch (err) {
      setError('Failed to summarize the webpage. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const markdownComponents = {
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400" {...props} />,
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-300" {...props} />,
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-lg font-medium mb-2 text-blue-500 dark:text-blue-200" {...props} />,
    p: (props: HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4 leading-relaxed" {...props} />,
    ul: (props: HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-outside pl-6 mb-4" {...props} />,
    ol: (props: HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-outside pl-6 mb-4" {...props} />,
    li: (props: HTMLAttributes<HTMLLIElement>) => <li className="mb-2" {...props} />,
    a: (props: HTMLAttributes<HTMLAnchorElement>) => (
      <a 
        className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer" 
        {...props} 
      />
    ),
    blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote 
        className={`border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-300' 
            : 'bg-gray-100 text-gray-700'
        }`} 
        {...props} 
      />
    ),
    code: ({inline, ...props}: {inline?: boolean} & HTMLAttributes<HTMLElement>) => (
      inline ? (
        <code 
          className={`px-1 rounded ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-200 text-gray-800'
          }`} 
          {...props} 
        />
      ) : (
        <pre 
          className={`overflow-x-auto p-4 rounded-md mb-4 ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <code {...props} />
        </pre>
      )
    ),
    hr: (props: HTMLAttributes<HTMLHRElement>) => (
      <hr 
        className={`my-6 border-t-2 ${
          isDarkMode 
            ? 'border-gray-700' 
            : 'border-gray-200'
        }`} 
        {...props} 
      />
    )
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-6 flex flex-col justify-center sm:py-12 transition-colors duration-300`}>
      <Head>
        <title>Web Page Summarizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-3 sm:max-w-4xl sm:mx-auto w-full px-4"
      >
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-purple-800 to-indigo-900' : 'bg-gradient-to-r from-cyan-400 to-light-blue-500'} shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl`}></div>
        
        <div className={`relative px-4 py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg sm:rounded-3xl sm:p-20`}>
          <button 
            onClick={toggleDarkMode} 
            className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-600" />}
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-extrabold text-center mb-6"
                >
                  Web Page Summarizer
                </motion.h1>
                
                <div className="flex flex-col">
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="url" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter webpage URL" 
                      className={`pl-10 px-3 py-2 w-full border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSummarize}
                    disabled={isLoading}
                    className={`mt-4 flex items-center justify-center space-x-2 py-2 rounded-md transition duration-300 ${
                      isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : `${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`
                    }`}
                  >
                    {url === lastSummarizedUrl ? (
                      <FaRedoAlt />
                    ) : (
                      <FaPaperPlane />
                    )}
                    <span>
                      {isLoading 
                        ? 'Summarizing...' 
                        : (url === lastSummarizedUrl ? 'Redo Summary' : 'Summarize')
                      }
                    </span>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-4 flex items-center space-x-2 ${isDarkMode ? 'text-red-400' : 'text-red-500'} text-sm`}
                    >
                      <FaExclamationCircle />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {summary && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className={`mt-6 p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-md w-full`}
                    >
                      <h2 className="text-xl font-semibold mb-4">Summary</h2>
                      <div className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} markdown-content`}>
                        <ReactMarkdown
                          components={markdownComponents}
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {summary}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}