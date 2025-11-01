import React, { useState, useEffect } from 'react';
import type { Listing } from '../types';
import { COUNTRIES, LISTING_TYPES, LOCATIONS } from '../constants';

type FormData = Omit<Listing, 'id' | 'authorId'>;

interface ListingFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: Listing | null;
}

export const ListingForm: React.FC<ListingFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const defaults = {
        title: '',
        description: '',
        country: '',
        state: '',
        city: '',
        type: '',
        location: { lat: 0, lng: 0 },
        createdAt: new Date().toISOString(),
        eventDate: '',
        eventTime: '',
    };
    return initialData ? { ...defaults, ...initialData } : defaults;
  });

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Effect to populate states and cities when editing
  useEffect(() => {
    if (initialData?.country) {
      setStates(Object.keys(LOCATIONS[initialData.country] || {}));
    }
    if (initialData?.country && initialData?.state) {
      setCities(LOCATIONS[initialData.country]?.[initialData.state] || []);
    }
  }, [initialData]);
  
  // Effect to update states when country changes
  useEffect(() => {
    if (formData.country) {
      const newStates = Object.keys(LOCATIONS[formData.country] || {});
      setStates(newStates);
      if (!initialData || formData.country !== initialData.country) {
        setFormData(prev => ({...prev, state: '', city: ''}));
      }
    } else {
      setStates([]);
    }
  }, [formData.country, initialData]);

  // Effect to update cities when state changes
  useEffect(() => {
    if (formData.country && formData.state) {
        const newCities = LOCATIONS[formData.country]?.[formData.state] || [];
        setCities(newCities);
        if (!initialData || formData.state !== initialData.state) {
            setFormData(prev => ({...prev, city: ''}));
        }
    } else {
        setCities([]);
    }
  }, [formData.state, formData.country, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          location: {
              ...prev.location,
              [name]: parseFloat(value) || 0
          }
      }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, createdAt: new Date().toISOString() });
  };
  
  const formTitle = initialData ? 'Edit Listing' : 'Create a New Listing';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium dark:text-gray-300">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium dark:text-gray-300">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium dark:text-gray-300">Country</label>
            <select name="country" value={formData.country} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              <option value="">Select Country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium dark:text-gray-300">State</label>
            <select name="state" value={formData.state} onChange={handleChange} required disabled={!formData.country} className="mt-1 w-full p-2 border rounded-md disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600">
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium dark:text-gray-300">City</label>
            <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state} className="mt-1 w-full p-2 border rounded-md disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600">
              <option value="">Select City</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium dark:text-gray-300">Date</label>
              <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
            </div>
            <div>
              <label htmlFor="eventTime" className="block text-sm font-medium dark:text-gray-300">Time</label>
              <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium dark:text-gray-300">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="">Select Type</option>
                {LISTING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="lat" className="block text-sm font-medium dark:text-gray-300">Latitude</label>
              <input type="number" step="any" name="lat" value={formData.location.lat} onChange={handleLocationChange} required placeholder="e.g., 34.0522" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
            </div>
            <div>
              <label htmlFor="lng" className="block text-sm font-medium dark:text-gray-300">Longitude</label>
              <input type="number" step="any" name="lng" value={formData.location.lng} onChange={handleLocationChange} required placeholder="e.g., -118.2437" className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Save Listing</button>
        </div>
      </form>
    </div>
  );
};
