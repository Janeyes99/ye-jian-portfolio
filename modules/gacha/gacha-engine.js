// Gacha Engine - Matching Algorithm
// Extracted from InteractiveGacha component

import { gachaDimensions, gachaProjectCatalog, gachaScoreKeys } from './gacha-data';

/**
 * Calculate match score between user preferences and project scores
 * Lower score = better match (closer to user preferences)
 */
export function calculateMatchScore(params, projectScores) {
  let totalScore = 0;
  let totalWeight = 0;
  
  gachaScoreKeys.forEach((key) => {
    const userValue = params[key] || 50;
    const projectValue = projectScores[key] || 50;
    const diff = Math.abs(userValue - projectValue);
    totalScore += diff;
    totalWeight += 1;
  });
  
  return totalWeight > 0 ? totalScore / totalWeight : 100;
}

/**
 * Find best matching projects based on user parameters
 * Returns sorted array of projects with match scores
 */
export function findMatches(params, maxResults = 3) {
  const matches = gachaProjectCatalog.map((project) => {
    const score = calculateMatchScore(params, project.scores);
    return { ...project, matchScore: score };
  });
  
  // Sort by match score (ascending - lower is better)
  matches.sort((a, b) => a.matchScore - b.matchScore);
  
  return matches.slice(0, maxResults);
}

/**
 * Random project selection with weighted preference
 * Uses a bias toward projects that match user preferences
 */
export function weightedRandomSelect(params, candidates = gachaProjectCatalog) {
  if (!candidates || candidates.length === 0) return null;
  
  // Calculate weights based on match scores
  const weights = candidates.map((project) => {
    const score = calculateMatchScore(params, project.scores);
    // Inverse score: better matches get higher weight
    return Math.max(1, 100 - score);
  });
  
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < candidates.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return candidates[i];
    }
  }
  
  return candidates[candidates.length - 1];
}

/**
 * Clamp value between 0 and 100
 */
export function clampParam(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Generate random parameters for demo mode
 */
export function generateRandomParams() {
  const params = {};
  gachaScoreKeys.forEach((key) => {
    params[key] = Math.floor(Math.random() * 101);
  });
  return params;
}
