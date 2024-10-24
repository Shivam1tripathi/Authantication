<h1>Project Title </h1>
<h2>Overview</h2>
This project is a user authentication system built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, and update their profiles, with support for password hashing, JWT-based authentication, and dark mode.

<h2>Key Features:</h2>
User Registration: Users can register by providing their name, email, password, phone number, address, and an answer to a security question.
Login: Registered users can log in with their email and password.
Profile Management: Users can view and update their profile details.
Password Reset: Users can reset their passwords using their registered email and security question.
Dark Mode: The app supports a dark mode theme, which adjusts based on the user's preference.
Project Setup
<h2>1. Clone the Repository</h2>
bash
Copy code
git clone https://github.com/your-repo-url.git
<h2>2. Install Backend Dependencies</h2>
Navigate to the backend directory and install the necessary dependencies:

bash
Copy code
cd backend
npm install
<h2>3. Install Frontend Dependencies</h2>
Navigate to the frontend directory and install the necessary dependencies:

bash
Copy code
cd frontend
npm install
<h2>4. Setup Environment Variables</h2>
Create a .env file in the root of your backend directory with the following variables:

makefile
Copy code
Mongodb_URL=<Your MongoDB URL>
jwt_secretkey=<Your JWT Secret Key>
REACT_APP_API=<Your Backend API URL>
5. Run the Application
To start both the backend and frontend:

bash
Copy code
# In the backend directory
npm start

# In the frontend directory
npm start
The frontend should now be running at http://localhost:3000 and the backend at http://localhost:5000.

Backend Overview
Technologies Used:
Node.js: Server-side runtime
Express: Web framework for Node.js
MongoDB: NoSQL database
Mongoose: MongoDB object modeling for Node.js
JWT: JSON Web Tokens for secure user authentication
Key Endpoints:
User Registration (/api/v2/auth/register)

Registers a new user with a hashed password.
Fields: name, email, password, Phone, address, answer
User Login (/api/v2/auth/login)

Authenticates the user and returns a JWT token.
Fields: email, password
Update Profile (/api/v2/auth/update-profile)

Allows users to update their profile, including password if necessary.
Forget Password (/api/v2/auth/forget-password)

Allows users to reset their password using a security answer.
Authentication:
JWT tokens are generated upon successful login and stored in local storage on the frontend.
Protected routes require valid tokens.
Frontend Overview
Technologies Used:
React: JavaScript library for building user interfaces
Material-UI: UI framework for responsive components
Axios: For making HTTP requests
React Router: For client-side routing
Components:
Login Component (/login)

Allows the user to log in. If login is successful, the JWT is saved, and the user is redirected.
Register Component (/register)

Users can register with their details, including name, email, password, phone, address, and a security answer.
Home Component (/)

Displays user details when logged in and allows access to profile editing.
Profile Update Component (/edit-profile)

Users can update their profile details including their name, phone, and password.
Dark Mode Handling

The theme changes based on the user's preference for dark mode, stored in the auth context.
Usage Guide
1. Registration
Users register with their name, email, password, phone number, and address. The app hashes the password before saving it to the database for security.

2. Login
Users log in with their email and password. Upon successful login, a JWT token is generated and stored in local storage. This token is used to authenticate further requests.

3. Profile Management
Users can view their profile details and update their information. They can also change their password, which is again hashed before saving.

4. Password Reset
Users who have forgotten their password can reset it by providing their email and answering the security question they set up during registration.

Dark Mode
The application has a built-in dark mode feature. When the user toggles dark mode in their preferences, the background and text colors adjust accordingly. The app persists this preference using the auth context, which is updated dynamically.

Potential Issues and Debugging
Phone Number Validation:

Ensure that phone numbers are exactly 10 digits in length. Validation is handled both on the frontend and backend.
JWT Token Expiry:

JWT tokens expire after 1 day. If a user's session has expired, they will need to log in again.
Environment Variables:

Ensure that all required environment variables (e.g., MongoDB URL, JWT secret) are set correctly in your .env file.
