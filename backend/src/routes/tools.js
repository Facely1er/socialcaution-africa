const express = require('express');
const logger = require('../utils/logger');

const router = express.Router();

router.post('/password-strength', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || typeof password !== 'string' || password.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ msg: 'Password is required' }]
      });
    }

    const strengthAnalysis = analyzePasswordStrength(password);

    res.json({
      status: 'success',
      data: {
        strength: strengthAnalysis,
        recommendations: generatePasswordRecommendations(strengthAnalysis)
      }
    });
  } catch (error) {
    logger.error('Password strength check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during password strength check'
    });
  }
});

const analyzePasswordStrength = (password) => {
  let score = 0;
  const feedback = [];

  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');

  if (password.length >= 12) score += 1;
  else feedback.push('Consider using 12+ characters for better security');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Include numbers');

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Include special characters');

  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push('Avoid repeating characters');
  }

  if (/123|abc|qwe|asd|zxc/i.test(password)) {
    score -= 1;
    feedback.push('Avoid common patterns');
  }

  let strength;
  if (score <= 2) strength = 'weak';
  else if (score <= 4) strength = 'fair';
  else if (score <= 5) strength = 'good';
  else strength = 'strong';

  return {
    score: Math.max(0, Math.min(100, score * 20)),
    strength,
    feedback,
    requirements: {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    }
  };
};

const generatePasswordRecommendations = (strengthAnalysis) => {
  const recommendations = [];

  if (strengthAnalysis.strength === 'weak') {
    recommendations.push('Your password is weak. Consider using a password manager to generate a strong password.');
  } else if (strengthAnalysis.strength === 'fair') {
    recommendations.push('Your password is fair. Try adding more character variety or length.');
  } else if (strengthAnalysis.strength === 'good') {
    recommendations.push('Your password is good. Consider making it even stronger for maximum security.');
  } else {
    recommendations.push('Excellent! Your password is strong and secure.');
  }

  if (strengthAnalysis.feedback.length > 0) {
    recommendations.push(...strengthAnalysis.feedback);
  }

  return recommendations;
};

module.exports = router;
