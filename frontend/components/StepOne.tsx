'use client';
import { useState } from 'react';

type StepOneProps = {
  onNext: (data: object) => void;
};

const CATEGORIES = ['planner', 'performer', 'crew'] as const;
const EVENT_TYPES = ['Wedding', 'Corporate', 'Concert', 'Festival', 'Private', 'Birthday'];

export default function StepOne({ onNext }: StepOneProps) {
  const [form, setForm] = useState({
    eventName: '',
    eventType: '',
    startDate: '',
    endDate: '',
    location: '',
    venue: '',
    category: '',
  });

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category) return alert('Please select what you are hiring for');
    onNext(form);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800">Step 1 — Event Basics</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
        <input
          required
          type="text"
          value={form.eventName}
          onChange={e => update('eventName', e.target.value)}
          className={inputClass}
          placeholder="e.g. Annual Tech Summit"
          style={{ color: '#111827' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
        <select
          required
          value={form.eventType}
          onChange={e => update('eventType', e.target.value)}
          className={inputClass}
          style={{ color: form.eventType ? '#111827' : '#9ca3af' }}
        >
          <option value="" disabled style={{ color: '#9ca3af' }}>Select event type...</option>
          {EVENT_TYPES.map(t => (
            <option key={t} value={t} style={{ color: '#111827' }}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
          <input
            required
            type="date"
            value={form.startDate}
            onChange={e => update('startDate', e.target.value)}
            className={inputClass}
            style={{ color: form.startDate ? '#111827' : '#9ca3af' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date (optional)</label>
          <input
            type="date"
            value={form.endDate}
            onChange={e => update('endDate', e.target.value)}
            className={inputClass}
            style={{ color: form.endDate ? '#111827' : '#9ca3af' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
        <input
          required
          type="text"
          value={form.location}
          onChange={e => update('location', e.target.value)}
          className={inputClass}
          placeholder="e.g. Mumbai, Maharashtra"
          style={{ color: '#111827' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Venue (optional)</label>
        <input
          type="text"
          value={form.venue}
          onChange={e => update('venue', e.target.value)}
          className={inputClass}
          placeholder="e.g. The Grand Ballroom"
          style={{ color: '#111827' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">I am hiring for: *</label>
        <div className="flex gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => update('category', cat)}
              className={`flex-1 py-3 rounded-lg border-2 capitalize font-medium transition-all ${
                form.category === cat
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-200 text-gray-700 bg-white hover:border-blue-300'
              }`}
            >
              {cat === 'planner' ? '📋 Planner' : cat === 'performer' ? '🎤 Performer' : '🔧 Crew'}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
      >
        Next →
      </button>
    </form>
  );
}