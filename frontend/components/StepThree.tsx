'use client';
import { useState } from 'react';

type StepThreeProps = {
  formData: Record<string, string>;
  onNext: (data: object) => void;
  onBack: () => void;
};

const categoryFields: Record<string, { name: string; label: string; type: string; options?: string[]; placeholder?: string }[]> = {
  planner: [
    { name: 'preferredStyle', label: 'Preferred Event Style', type: 'select',
      options: ['Luxury', 'Minimalist', 'Traditional', 'Modern', 'Rustic', 'Themed'] },
    { name: 'decisionTimeline', label: 'Decision Timeline', type: 'select',
      options: ['Within 1 week', '2-4 weeks', '1-2 months', 'Flexible'] },
    { name: 'additionalNotes', label: 'Additional Requirements', type: 'textarea',
      placeholder: 'Any specific requests, dietary restrictions, cultural considerations...' },
  ],
  performer: [
    { name: 'ageGroup', label: 'Target Audience Age Group', type: 'select',
      options: ['Children (under 12)', 'Teens (12-18)', 'Adults (18+)', 'Mixed / All ages'] },
    { name: 'language', label: 'Preferred Language', type: 'select',
      options: ['Hindi', 'English', 'Both Hindi & English', 'Regional', 'Any'] },
    { name: 'additionalNotes', label: 'Additional Notes', type: 'textarea',
      placeholder: 'Song requests, content restrictions, special instructions...' },
  ],
  crew: [
    { name: 'accommodation', label: 'Accommodation Provided?', type: 'select',
      options: ['Yes', 'No', 'For outstation only'] },
    { name: 'meals', label: 'Meals Provided?', type: 'select',
      options: ['Yes', 'No', 'Allowance provided'] },
    { name: 'additionalNotes', label: 'Additional Notes', type: 'textarea',
      placeholder: 'Dress code, specific tools required, parking availability...' },
  ],
};

export default function StepThree({ formData, onNext, onBack }: StepThreeProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const category = formData.category;
  const fields = categoryFields[category] || [];

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(form);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const darkText = { color: '#111827' };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Step 3 — Preferences</h2>
        <p className="text-sm text-gray-500 mt-1">Final details to help us find the best match</p>
      </div>

      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          {field.type === 'select' ? (
            <select
              onChange={e => update(field.name, e.target.value)}
              className={inputClass}
              style={darkText}
            >
              <option value="">Select...</option>
              {field.options?.map(o => (
                <option key={o} value={o} style={darkText}>{o}</option>
              ))}
            </select>
          ) : (
            <textarea
              onChange={e => update(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={inputClass + ' resize-none'}
              style={darkText}
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors">
          ← Back
        </button>
        <button type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
          Next →
        </button>
      </div>
    </form>
  );
}