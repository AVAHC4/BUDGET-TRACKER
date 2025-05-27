# BudgetTracker - Personal Finance Management

<p align="center">
  <img src="frontend/src/assets/logo.svg" width="120px" />
</p>

## About BudgetTracker

BudgetTracker is a comprehensive personal finance management application built from the ground up using the MERN stack. Developed in 2025, this application allows users to track expenses, monitor income, and gain valuable insights into their spending habits through intuitive visualizations and detailed reports.

With its sleek, modern interface and powerful backend capabilities, BudgetTracker is designed to make financial management accessible and effective for everyone.

## Key Features

- **Expense & Income Tracking**: Easily record all your financial transactions
- **Visual Dashboard**: Get a clear overview of your finances with intuitive charts
- **Category Management**: Organize expenses into customizable categories
- **Weekly Spending Analysis**: Track spending patterns over time
- **Secure Authentication**: Protect your financial data with robust user authentication
- **Responsive Design**: Access your finances from any device

## Technology Stack

### Frontend
- **React 18**: Built with the latest React features
- **TypeScript**: Enhanced code quality and developer experience
- **Redux Toolkit**: Efficient state management
- **Tailwind CSS**: Modern, utility-first CSS framework
- **DaisyUI**: Component library for enhanced UI elements
- **Vite**: Lightning-fast build tool

### Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express**: Minimalist web framework for API endpoints
- **MongoDB**: NoSQL database for flexible data storage
- **JWT Authentication**: Secure user authentication
- **Mongoose**: Elegant MongoDB object modeling

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/AVAHC4/BUDGET-TRACKER.git
   ```

2. Install dependencies
   ```
   cd BUDGET-TRACKER
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```

4. Start the development server
   ```
   npm run dev
   ```

## Screenshots

<p align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="800"/>
</p>

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

AVAHC4 - [GitHub Profile](https://github.com/AVAHC4)

Project Link: [https://github.com/AVAHC4/BUDGET-TRACKER](https://github.com/AVAHC4/BUDGET-TRACKER)

## Additional Features

- **Dark Mode Support**: Toggle between light and dark themes based on your preference
- **Multi-Currency Support**: Handle transactions in different currencies with automatic conversion
- **Profile Customization**: Upload and manage your profile picture
- **Enhanced Security**: JWT-based authentication system
- **Data Export**: Export your financial data in various formats
- **Mobile-Optimized**: Fully responsive design for all devices

## Project Structure

```
BUDGET-TRACKER/
├── backend/               # Node.js + Express backend
│   ├── controllers/       # Request handlers
│   ├── models/            # MongoDB schema models
│   ├── middleware/        # Express middleware
│   ├── routes/            # API route definitions
│   └── server.ts          # Express app initialization
├── frontend/              # React + TypeScript frontend
│   ├── public/            # Static assets
│   └── src/
│       ├── assets/        # Images and icons
│       ├── components/    # Reusable UI components
│       ├── features/      # Redux slices and services
│       ├── pages/         # Application page components
│       └── utils/         # Helper functions
└── shared/                # Shared type definitions
```

## Development

```bash
# Run frontend only
npm run client

# Run backend only
npm run server

# Run both concurrently
npm run dev
```

## Deployment

The application can be deployed to various platforms:

- Frontend: Vercel, Netlify, or GitHub Pages
- Backend: Heroku, Railway, or any Node.js hosting service
- Database: MongoDB Atlas

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve BudgetTracker.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

---

Made with dedication by AVAHC4. Copyright © 2025.
