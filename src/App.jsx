/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar, Users, Target, RotateCcw } from 'lucide-react';

const App = () => {
  const [inputs, setInputs] = useState({
    totalInvestment: '',
    monthlyFixedExpenses: '',
    expectedYears: '',
    operatingDaysPerYear: '',
    directExpensesPerDay: '',
    customersPerDay: ''
  });

  const [results, setResults] = useState({
    dailyReturnNeeded: 0,
    targetedSaleValuePerDay: 0,
    targetedSaleValuePerCustomer: 0
  });

  const [errors, setErrors] = useState({});

  const [currency, setCurrency] = useState('USD');

  const currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
  ];

  const calculateResults = () => {
    const { totalInvestment, monthlyFixedExpenses, expectedYears, operatingDaysPerYear, directExpensesPerDay, customersPerDay } = inputs;
    
    // Convert string inputs to numbers
    const totalInv = parseFloat(totalInvestment) || 0;
    const monthlyExp = parseFloat(monthlyFixedExpenses) || 0;
    const years = parseFloat(expectedYears) || 0;
    const opDays = parseFloat(operatingDaysPerYear) || 0;
    const directExp = parseFloat(directExpensesPerDay) || 0;
    const customers = parseFloat(customersPerDay) || 0;
    
    // Check if all values are valid
    if (totalInv <= 0 || monthlyExp <= 0 || years <= 0 || opDays <= 0 || directExp <= 0 || customers <= 0) {
      setResults({
        dailyReturnNeeded: 0,
        targetedSaleValuePerDay: 0,
        targetedSaleValuePerCustomer: 0
      });
      return;
    }
    
    // Daily return needed = (Total Investment + (Monthly Fixed Expenses * Expected Years * 12)) / (Operating Days * Expected Years)
    const dailyReturnNeeded = (totalInv + (monthlyExp * years * 12)) / (opDays * years);
    
    // Targeted sale value per day = Direct expenses per day + Daily return needed
    const targetedSaleValuePerDay = directExp + dailyReturnNeeded;
    
    // Targeted sale value per customer = Targeted sale value per day / Customers per day
    const targetedSaleValuePerCustomer = targetedSaleValuePerDay / customers;

    setResults({
      dailyReturnNeeded,
      targetedSaleValuePerDay,
      targetedSaleValuePerCustomer
    });
  };

  const handleInputChange = (field, value) => {
    // Allow decimal numbers and empty string
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Clear existing error for this field
    setErrors(prev => ({ ...prev, [field]: '' }));
    
    // Validate Operating Days per Year doesn't exceed 365
    if (field === 'operatingDaysPerYear' && numericValue && parseFloat(numericValue) > 365) {
      setErrors(prev => ({ ...prev, [field]: 'Operating days cannot exceed 365 days per year' }));
    }
    
    setInputs(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const handleReset = () => {
    setInputs({
      totalInvestment: '',
      monthlyFixedExpenses: '',
      expectedYears: '',
      operatingDaysPerYear: '',
      directExpensesPerDay: '',
      customersPerDay: ''
    });
    setResults({
      dailyReturnNeeded: 0,
      targetedSaleValuePerDay: 0,
      targetedSaleValuePerCustomer: 0
    });
    setErrors({});
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 px-4">
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-[#64CE72]" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">DoWell Breakeven Point Calculator</h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <p className="text-gray-600 text-sm sm:text-base text-center">Calculate your business breakeven point with precision</p>
            <div className="bg-white rounded-lg shadow-lg p-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-700 font-medium cursor-pointer text-sm"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#64CE72]" />
                  Business Parameters
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#64CE72]" />
                    Total Investment ({currency})
                  </label>
                  <input
                    type="text"
                    value={inputs.totalInvestment}
                    onChange={(e) => handleInputChange('totalInvestment', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="Enter total investment"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#64CE72]" />
                    Monthly Fixed Expenses ({currency})
                  </label>
                  <input
                    type="text"
                    value={inputs.monthlyFixedExpenses}
                    onChange={(e) => handleInputChange('monthlyFixedExpenses', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="Enter monthly fixed expenses"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64CE72]" />
                    Expected Years for ROI
                  </label>
                  <input
                    type="text"
                    value={inputs.expectedYears}
                    onChange={(e) => handleInputChange('expectedYears', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="Enter expected years"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64CE72]" />
                    Operating Days per Year
                  </label>
                  <input
                    type="text"
                    value={inputs.operatingDaysPerYear}
                    onChange={(e) => handleInputChange('operatingDaysPerYear', e.target.value)}
                    className={`w-full p-3 sm:p-4 border-2 rounded-lg focus:outline-none transition-colors text-base sm:text-lg ${
                      errors.operatingDaysPerYear 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-[#64CE72]'
                    }`}
                    placeholder="Enter operating days per year"
                  />
                  {errors.operatingDaysPerYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.operatingDaysPerYear}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#64CE72]" />
                    Direct Expenses per Day ({currency})
                  </label>
                  <input
                    type="text"
                    value={inputs.directExpensesPerDay}
                    onChange={(e) => handleInputChange('directExpensesPerDay', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="Enter direct expenses per day"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#64CE72]" />
                    Customers per Day
                  </label>
                  <input
                    type="text"
                    value={inputs.customersPerDay}
                    onChange={(e) => handleInputChange('customersPerDay', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="Enter customers per day"
                  />
                </motion.div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={calculateResults}
                  className="bg-[#64CE72] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 text-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1 order-2 lg:order-2">
            <div className="bg-gradient-to-br from-[#64CE72] to-green-600 rounded-2xl shadow-xl p-4 sm:p-6 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                Results
              </h2>
              
              <div className="space-y-4">
                <motion.div 
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <h3 className="text-sm font-semibold mb-2">Targeted Sale Value per Day</h3>
                  <p className="text-lg sm:text-xl font-bold break-words">{formatCurrency(results.targetedSaleValuePerDay)}</p>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <h3 className="text-sm font-semibold mb-2">Targeted Sale Value per Customer</h3>
                  <p className="text-lg sm:text-xl font-bold break-words">{formatCurrency(results.targetedSaleValuePerCustomer)}</p>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default App;