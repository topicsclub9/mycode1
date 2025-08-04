import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Sparkles } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    month: '',
    year: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const day = parseInt(formData.day);
    const month = parseInt(formData.month);
    const year = parseInt(formData.year);
    
    if (!formData.day || day < 1 || day > 31) {
      newErrors.day = 'Valid day (1-31) is required';
    }
    
    if (!formData.month || month < 1 || month > 12) {
      newErrors.month = 'Valid month (1-12) is required';
    }
    
    if (!formData.year || year < 1900 || year > new Date().getFullYear()) {
      newErrors.year = 'Valid year is required';
    }
    
    // Check for valid date
    if (day && month && year && !newErrors.day && !newErrors.month && !newErrors.year) {
      const date = new Date(year, month - 1, day);
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        newErrors.day = 'Invalid date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        day: parseInt(formData.day),
        month: parseInt(formData.month),
        year: parseInt(formData.year)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Matrix Destiny Chart</h1>
          <p className="text-purple-200 text-lg">Discover your life's purpose and hidden potential</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-xl text-center">Enter Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-purple-400"
                />
                {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Your Birth Date
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Input
                      type="number"
                      placeholder="Day"
                      min="1"
                      max="31"
                      value={formData.day}
                      onChange={(e) => handleInputChange('day', e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-purple-400"
                    />
                    {errors.day && <p className="text-red-300 text-xs mt-1">{errors.day}</p>}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Month"
                      min="1"
                      max="12"
                      value={formData.month}
                      onChange={(e) => handleInputChange('month', e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-purple-400"
                    />
                    {errors.month && <p className="text-red-300 text-xs mt-1">{errors.month}</p>}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Year"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder-white/60 focus:border-purple-400"
                    />
                    {errors.year && <p className="text-red-300 text-xs mt-1">{errors.year}</p>}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Calculating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate My Chart
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-purple-200 text-sm">
            Your personal information is processed locally and never stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputForm;

