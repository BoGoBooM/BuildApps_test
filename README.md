# BuildApps User Table — Test Task

This is a test assignment for **BuildApps LLC**.  
The goal is to develop a React application that displays a table of users with **server-side filtering** and **pagination**, using a public API.

---

## Features

The app fetches users from the [Random User API](https://randomuser.me/) and displays them in a clean, responsive table format.

### Filtering

- **By Gender**:  
  Male / Female / All  
- **By Nationality**:  
  US, GB, FR, DE, AU, UA  

Filtering is handled **server-side** via query parameters.

### Pagination

- Displays **10 users per page**
- Includes navigation buttons to switch between pages
- Uses **server-side pagination** via API requests

### Table Columns

| First Name | Last Name | Gender | Email | Nationality |
|------------|-----------|--------|-------|-------------|

---

## Technologies Used

- **React** + **TypeScript**
- **Tailwind CSS** — for styling and responsive layout
- **Fetch API** — for HTTP requests
- **Functional Components** and **React Hooks**
- All TypeScript types are organized in a separate file: `types/User.ts`

---

## Getting Started

To run the project locally:

```bash
# 1. Clone the repository or extract the archive
git clone https://github.com/BoGoBooM/BuildApps_test.git

# 2. Navigate to the project directory
cd BuildApps

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

---

## App will be available at:

- http://localhost:3000  
or  
- http://localhost:5173/ (depending on your setup)

---

## Requirements Met

- [x] Server-side pagination  
- [x] Server-side filtering by gender and nationality  
- [x] Responsive and clean UI using Tailwind CSS  
- [x] Proper use of TypeScript and React best practices  

---

Feel free to reach out if you have any questions!
