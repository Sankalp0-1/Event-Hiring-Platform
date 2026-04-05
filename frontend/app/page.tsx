'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';
import StepThree from '@/components/StepThree';
import { submitRequirement } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const next = (data: object) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      await submitRequirement(formData);
      router.push('/submit');
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a Requirement</h1>
          <p className="text-gray-500 mt-1">Tell us what you need for your event</p>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all ${step >= n ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <p className={`text-xs mt-1 text-center ${step >= n ? 'text-blue-600' : 'text-gray-400'}`}>
                {n === 1 ? 'Basics' : n === 2 ? 'Details' : n === 3 ? 'Preferences' : 'Review'}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 1 && <StepOne onNext={next} />}
          {step === 2 && <StepTwo formData={formData as Record<string, string>} onNext={next} onBack={() => setStep(1)} />}
          {step === 3 && <StepThree formData={formData as Record<string, string>} onNext={next} onBack={() => setStep(2)} />}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Step 4 — Review & Submit</h2>
                <p className="text-sm text-gray-500 mt-1">Check everything before posting</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {Object.entries(formData).map(([key, value]) =>
                  value ? (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-gray-800 font-medium">{String(value)}</span>
                    </div>
                  ) : null
                )}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Requirement ✓'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}