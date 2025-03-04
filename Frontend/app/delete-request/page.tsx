'use client';
import React, { useState } from 'react'

function Page() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        
        if (value && value !== value.toUpperCase()) {
            setError('Name must be in UPPERCASE only');
        } else {
            setError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            setError('Name is required');
            return;
        }
        if (name !== name.toUpperCase()) {
            setError('Name must be in UPPERCASE only');
            return;
        }
        // Process form submission
        console.log('Form submitted:', name);
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Delete Request Form</h1>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name (UPPERCASE ONLY)</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        required 
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <p className="font-bold">Warning!</p>
                    <p className="text-sm">
                        By submitting this form, you acknowledge that your account will be permanently blacklisted from our services.
                    </p>
                </div>
                
                <div>
                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Submit Delete Request
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Page