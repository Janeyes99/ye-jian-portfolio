// Gacha Control Panel - Sliders and Buttons
// Extracted from InteractiveGacha component

import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/js/i18n';
import { gachaDimensions } from './gacha-data';
import { clampParam } from './gacha-engine';

/**
 * Gacha Dimension Slider Component
 * Renders a single dimension slider with left/right labels
 */
export function DimensionSlider({ dim, value, onChange }) {
  const { t, lang } = useContext(LanguageContext);
  
  const handleChange = (e) => {
    const newValue = clampParam(parseInt(e.target.value, 10));
    onChange(dim.id, newValue);
  };
  
  return (
    <div className="gacha-dimension-slider">
      <div className="dimension-labels">
        <span className="left-label">{dim.left[lang]}</span>
        <span className="right-label">{dim.right[lang]}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="dimension-input"
        aria-label={`${dim.left[lang]} - ${dim.right[lang]}`}
      />
      <div className="dimension-value">{value}</div>
    </div>
  );
}

/**
 * Gacha Control Panel
 * Contains all dimension sliders and action buttons
 */
export function GachaControls({ params, onParamChange, onRoll, onReset, status }) {
  const { t, lang } = useContext(LanguageContext);
  
  return (
    <div className="gacha-controls">
      <div className="gacha-dimensions">
        {gachaDimensions.map((dim) => (
          <DimensionSlider
            key={dim.id}
            dim={dim}
            value={params[dim.id] || 50}
            onChange={onParamChange}
          />
        ))}
      </div>
      
      <div className="gacha-actions">
        <button
          className="gacha-roll-button"
          onClick={onRoll}
          disabled={status === 'rolling'}
        >
          {status === 'rolling'
            ? (lang === 'en' ? 'Rolling...' : '摇出中...')
            : (lang === 'en' ? 'Roll' : '摇出')
          }
        </button>
        
        <button
          className="gacha-reset-button"
          onClick={onReset}
          disabled={status === 'rolling'}
        >
          {lang === 'en' ? 'Reset' : '重置'}
        </button>
      </div>
    </div>
  );
}

/**
 * Gacha Result Display
 * Shows the matched project(s)
 */
export function GachaResult({ result, onNavigate }) {
  const { lang } = useContext(LanguageContext);
  
  if (!result) return null;
  
  return (
    <div className="gacha-result">
      <div className="result-project">
        <h3 className="result-title">{result.title[lang]}</h3>
        <p className="result-category">{result.category}</p>
        <p className="result-year">{result.year}</p>
        <button
          className="result-view-button"
          onClick={() => onNavigate(result.slug || result.id)}
        >
          {lang === 'en' ? 'View Project' : '查看项目'}
        </button>
      </div>
    </div>
  );
}

export default GachaControls;
