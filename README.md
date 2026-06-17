# NeoLearn

**NeoLearn** is a comprehensive, full-stack Learning Management System (LMS) designed to streamline the educational experience for both students and administrators. Built with modern web technologies, it offers a seamless interface for course management, secure payments, and user authentication.

---

## 🚀 Live Demo & Repository

* **Live Demo:** [https://neo-learnv2.vercel.app/](https://neo-learnv2.vercel.app/)
* **GitHub Repository:** [https://github.com/Akashchoudhary01/NeoLearnv2](https://github.com/Akashchoudhary01/NeoLearnv2)

---

## 🛠 Tech Stack

### Frontend (Client)

* **Framework:** React (Vite)
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS & DaisyUI
* **Routing:** React Router DOM
* **Data Fetching:** Axios
* **Utilities:** React Hot Toast, React Icons, Chart.js

### Backend (Server)

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcryptjs
* **Payments:** Razorpay Integration
* **Media/Storage:** Cloudinary
* **Email Services:** Brevo (formerly Sendinblue) API

---

* **ROLE**
  *SUPER_ADMIN*
  *ADMIN*
  *USER*

## 📂 Project Structure

### Client (Frontend)

The frontend is organized by feature and functionality:

* `src/Components/`: Reusable UI components (Auth, Layout, etc.)
* `src/Pages/`: Primary view components (AdminDashboard, Homepage, Profile, etc.)
* `src/Redux/`: Global state management slices
* `src/Helpers/`: Axios instances and helper utilities

### Server (Backend)

The backend follows a clean MVC (Model-View-Controller) architecture:

* `controllers/`: Business logic for courses, users, and payments
* `models/`: Mongoose schemas for data structures
* `routes/`: API endpoint definitions
* `middleware/`: Authentication and error-handling layers
* `utils/`: Utility functions like `sendEmail.js` and error handlers

---

## 🔑 Admin Credentials

To explore the administrative features of NeoLearn, you can use the following credentials:

* **Email:** `akashkrchoudhary007@gmail.com`
* **Password:** `Admin@6969`

---

## 💡 Key Features

* **Role-Based Access Control:** Separate interfaces and permissions for standard users and administrators.
* **Dynamic Dashboard:** Insights and management tools for administrators.
* **Secure Authentication:** JWT-based secure login and registration.
* **Integrated Payments:** Smooth checkout experience powered by Razorpay.
* **Responsive UI:** Fully optimized design using Tailwind CSS and DaisyUI.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Akashchoudhary01/NeoLearnv2

```



```

2.  **Setup Server:**
    ```bash
    cd Server
    npm install
    # Create a .env file and configure your MongoDB URI, JWT_SECRET, Cloudinary, Razorpay, and Brevo API keys
    npm run dev

```

3. **Setup Client:**
```bash
cd Client
npm install
# Create a .env file for your API base URL
npm run dev

```



```

```
