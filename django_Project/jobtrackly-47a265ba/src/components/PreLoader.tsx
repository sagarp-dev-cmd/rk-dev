
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Longer loading time for smoother animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeOut" }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
        >
          <div className="relative flex flex-col items-center">
            <div className="flex items-center justify-center mb-8">
              {/* Letters container */}
              <div className="flex space-x-1">
                {'JobTrackly'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      opacity: 0,
                      y: -50,
                    }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }
                    }}
                    className="inline-block text-4xl sm:text-6xl font-bold"
                  >
                    <span className="bg-gradient-to-br from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {letter}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Loading bar */}
            <div className="w-48 sm:w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ 
                  width: "100%",
                  transition: { 
                    duration: 2.5,
                    ease: "easeInOut"
                  }
                }}
                className="h-full bg-gradient-to-r from-primary via-blue-600 to-purple-600"
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.5 }
              }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-300"
            >
              Loading your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
