# DoWell Breakeven Point Calculator

A modern, responsive React application for calculating business breakeven points with precision. Built with React, Vite, and Tailwind CSS.

## Features

- 🧮 **Accurate Calculations**: Calculate daily return needed, targeted sale value per day, and targeted sale value per customer
- 💱 **Multi-Currency Support**: Support for 7 currencies (INR, USD, EUR, GBP, JPY, CAD, AUD) with proper formatting
- 📱 **Mobile-First Design**: Fully responsive design that works seamlessly on all devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations using Framer Motion
- 🔄 **Real-time Updates**: Calculations update automatically as you change input values
- 🧹 **Reset Functionality**: Clear all inputs with a single click
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and build times

## Business Parameters

The calculator takes the following inputs:
- Total Investment
- Monthly Fixed Expenses
- Expected Years for ROI
- Operating Days per Year
- Direct Expenses per Day
- Customers per Day

## Calculations

The app calculates:
1. **Daily Return Needed**: `(Total Investment + (Monthly Fixed Expenses × Expected Years × 12)) / (Operating Days × Expected Years)`
2. **Targeted Sale Value per Day**: `Direct Expenses per Day + Daily Return Needed`
3. **Targeted Sale Value per Customer**: `Targeted Sale Value per Day / Customers per Day`

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Development**: ESLint for code quality


