'use client';
import { useState } from 'react';

type StepTwoProps = {
  formData: Record<string, string>;
  onNext: (data: object) => void;
  onBack: () => void;
};

type Field = {
  name: string;
  label: string;
  type: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

const categoryFields: Record<string, Field[]> = {
  planner: [
    { name: 'budget', label: 'Budget (₹)', type: 'number', placeholder: 'e.g. 500000', required: true },
    { name: 'guestCount', label: 'Expected Guests', type: 'number', placeholder: 'e.g. 200', required: true },
    { name: 'experienceLevel', label: 'Experience Level Required', type: 'select', required: true,
      options: ['Junior (1-3 yrs)', 'Mid (3-7 yrs)', 'Senior (7+ yrs)'] },
    { name: 'servicesRequired', label: 'Services Required', type: 'select',
      options: ['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Vendor Management'] },
  ],
  performer: [
    { name: 'performanceType', label: 'Performance Type', type: 'select', required: true,
      options: ['Band', 'Solo Artist', 'DJ', 'Comedian', 'Dancer', 'Magician', 'Speaker', 'Emcee'] },
    { name: 'duration', label: 'Performance Duration (minutes)', type: 'number', placeholder: 'e.g. 90', required: true },
    { name: 'fee', label: 'Budget / Fee (₹)', type: 'number', placeholder: 'e.g. 50000' },
    { name: 'technicalRider', label: 'Technical Requirements', type: 'textarea', placeholder: 'Sound system, lighting, stage size...' },
  ],
  crew: [
    { name: 'crewType', label: 'Crew Type', type: 'select', required: true,
      options: ['AV / Technical', 'Security', 'Stagehands', 'Ushers', 'Catering Staff', 'Photographers', 'Videographers'] },
    { name: 'numberOfPeople', label: 'Number of People Needed', type: 'number', placeholder: 'e.g. 5', required: true },
    { name: 'shiftHours', label: 'Shift Duration (hours)', type: 'number', placeholder: 'e.g. 8' },
    { name: 'certifications', label: 'Certifications / Skills Required', type: 'text', placeholder: 'e.g. First Aid, CCTV Operation' },
  ],
};

export default function StepTwo({ formData, onNext, onBack }: StepTwoProps) {
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
        <h2 className="text-2xl font-semibold text-gray-800 capitalize">
          Step 2 — {category} Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">Tell us more about what you need</p>
      </div>

      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === 'select' ? (
            <select
              required={field.required}
              onChange={e => update(field.name, e.target.value)}
              className={inputClass}
              style={darkText}
            >
              <option value="">Select...</option>
              {field.options?.map(o => (
                <option key={o} value={o} style={darkText}>{o}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              onChange={e => update(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className={inputClass + ' resize-none'}
              style={darkText}
            />
          ) : (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              onChange={e => update(field.name, e.target.value)}
              className={inputClass}
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