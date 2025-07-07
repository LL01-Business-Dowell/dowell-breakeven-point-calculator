import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Calendar, Users, Target, RotateCcw } from 'lucide-react';

const App = () => {
  const [inputs, setInputs] = useState({
    totalInvestment: 10000000,
    monthlyFixedExpenses: 100000,
    expectedYears: 2,
    operatingDaysPerYear: 300,
    directExpensesPerDay: 200000,
    customersPerDay: 100
  });

  const [results, setResults] = useState({
    dailyReturnNeeded: 0,
    targetedSaleValuePerDay: 0,
    targetedSaleValuePerCustomer: 0
  });

  const [currency, setCurrency] = useState('INR');

  const currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
  ];

  // Calculate results whenever inputs change
  useEffect(() => {
    const calculateResults = () => {
      const { totalInvestment, monthlyFixedExpenses, expectedYears, operatingDaysPerYear, directExpensesPerDay, customersPerDay } = inputs;
      
      // Daily return needed = (Total Investment + (Monthly Fixed Expenses * Expected Years * 12)) / (Operating Days * Expected Years)
      const dailyReturnNeeded = (totalInvestment + (monthlyFixedExpenses * expectedYears * 12)) / (operatingDaysPerYear * expectedYears);
      
      // Targeted sale value per day = Direct expenses per day + Daily return needed
      const targetedSaleValuePerDay = directExpensesPerDay + dailyReturnNeeded;
      
      // Targeted sale value per customer = Targeted sale value per day / Customers per day
      const targetedSaleValuePerCustomer = targetedSaleValuePerDay / customersPerDay;

      setResults({
        dailyReturnNeeded,
        targetedSaleValuePerDay,
        targetedSaleValuePerCustomer
      });
    };

    calculateResults();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleReset = () => {
    setInputs({
      totalInvestment: 0,
      monthlyFixedExpenses: 0,
      expectedYears: 0,
      operatingDaysPerYear: 0,
      directExpensesPerDay: 0,
      customersPerDay: 0
    });
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
                    type="number"
                    value={inputs.totalInvestment}
                    onChange={(e) => handleInputChange('totalInvestment', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="10,000,000"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#64CE72]" />
                    Monthly Fixed Expenses ({currency})
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlyFixedExpenses}
                    onChange={(e) => handleInputChange('monthlyFixedExpenses', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="100,000"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64CE72]" />
                    Expected Years for ROI
                  </label>
                  <input
                    type="number"
                    value={inputs.expectedYears}
                    onChange={(e) => handleInputChange('expectedYears', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="2"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64CE72]" />
                    Operating Days per Year
                  </label>
                  <input
                    type="number"
                    value={inputs.operatingDaysPerYear}
                    onChange={(e) => handleInputChange('operatingDaysPerYear', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="300"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#64CE72]" />
                    Direct Expenses per Day ({currency})
                  </label>
                  <input
                    type="number"
                    value={inputs.directExpensesPerDay}
                    onChange={(e) => handleInputChange('directExpensesPerDay', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="200,000"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#64CE72]" />
                    Customers per Day
                  </label>
                  <input
                    type="number"
                    value={inputs.customersPerDay}
                    onChange={(e) => handleInputChange('customersPerDay', e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:border-[#64CE72] focus:outline-none transition-colors text-base sm:text-lg"
                    placeholder="100"
                  />
                </motion.div>
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

                <motion.div 
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                >
                  <div className="text-center">
                    <p className="text-xs opacity-75 mb-1">Total Investment</p>
                    <p className="text-base sm:text-lg font-bold break-words">{formatCurrency(inputs.totalInvestment)}</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                >
                  <div className="text-center">
                    <p className="text-xs opacity-75 mb-1">Payback Period</p>
                    <p className="text-base sm:text-lg font-bold">{inputs.expectedYears} Years</p>
                  </div>
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