/**
 * Production-safe logger utility
 * 
 * In development: Logs to console
 * In production: Can be configured to send to error tracking service (Sentry, etc.)
 */

const isDevelopment = import.meta.env.DEV;

interface LogContext {
  [key: string]: unknown;
}

export const logger = {
  /**
   * Log errors - always logged, but in production should go to error tracking
   */
  error: (message: string, error?: unknown, context?: LogContext) => {
    if (isDevelopment) {
      console.error(message, error, context);
    } else {
      // In production, you would send to Sentry, LogRocket, etc.
      // For now, we still log critical errors
      console.error(`[ERROR] ${message}`, error);
    }
  },

  /**
   * Log warnings - only in development
   */
  warn: (message: string, context?: LogContext) => {
    if (isDevelopment) {
      console.warn(message, context);
    }
  },

  /**
   * Log info - only in development
   */
  info: (message: string, context?: LogContext) => {
    if (isDevelopment) {
      console.info(message, context);
    }
  },

  /**
   * Log debug info - only in development
   */
  debug: (message: string, context?: LogContext) => {
    if (isDevelopment) {
      console.log(message, context);
    }
  },
};

export default logger;
