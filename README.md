# Role-Based Access Control (RBAC) UI

## Assignment Details
**Scenario:**  
Build an admin dashboard for managing users, roles, and permissions. The goal is to design a secure and user-friendly interface where administrators can assign roles, define permissions, and manage users efficiently.

### Core Requirements
1. **User Management:**  
   - View and manage users.  
   - Add, edit, or delete users.  
   - Assign roles to users and manage their status (e.g., Active/Inactive).  

2. **Role Management:**  
   - Define and edit roles.  
   - Include permissions for roles (e.g., Read, Write, Delete) or custom attributes.  

3. **Dynamic Permissions:**  
   - Assign or modify permissions for roles.  
   - Display permissions clearly for ease of understanding and modification.  

4. **Custom API Simulation (Optional):**  
   - Mock API calls for CRUD operations on users and roles.  
   - Simulate server responses to validate functionality.  

---

## Project Workflow and Features

### 1. **Homepage**
   - Upon starting the server, the user is greeted with a homepage displaying a logo, an "About Us" section, and a **Login** button.

### 2. **Login Page**
   - Clicking the **Login** button navigates to the login page.  
   - If the user does not have an account, a **"Not joined us yet?"** link redirects to the signup page.

### 3. **Signup Page**
   - Users must provide **Name**, **Email**, and **Password** to sign up.  
   - All fields are mandatory, and the **Signup** button is enabled only after valid input.  
   - On successful signup, the user is redirected to the login page.  

### 4. **Default Role Assignment**
   - New accounts are assigned the role **User** by default.

### 5. **User Role Workflow**
   - **Post-Login:**  
     - Users with the role `User` are redirected to the **Organization Page**.  
     - The page includes a table listing organization members with the following columns:  
       `S.No`, `Name`, `Email`, `Role`, `Options`.  
     - Features:  
       - **Search bar** for quick filtering.  
       - **Pagination** to show 5 entries per page.  
       - **View Details** button to see user-specific information, including ID, name, email, role, and status.  
       - Restricted access: Users cannot edit or delete any details.  

   - **Additional User Options:**  
     - **Change Password** for their account.  
     - **Homepage Navigation** to view company information.  
     - **Logout** functionality.  

### 6. **Admin Role Workflow**
   - **Post-Login:**  
     - Admins are redirected to a page titled **"Welcome Admin"** with the same member list table.  
     - Additional Admin Features:  
       - **Add User Button**: Opens a dialog to add a new user by entering `Name`, `Email`, and selecting `Role`.  
         - Newly added users have a default password: **"password123"** and status: **Active**.  
         - After adding, the admin is redirected to the updated member list.  

       - **View Details Page:**  
         - Same detailed view as for users, with additional buttons to:  
           - **Edit Details**: Modify `Name`, `Email`, `Role`, and `Status` of a user.  
           - **Delete User**: Remove a user from the list.  
         - After each action, the admin is redirected to the updated member list.

   - **Additional Admin Options:**  
     - **Change Password** for their account.  
     - **Homepage Navigation** to view company information.  
     - **Logout** functionality.  

### 7. **Navbar**
   - Once logged in, a responsive **Navbar** is displayed with:  
     - **Company Branding** on the top left.  
     - Links:  
       - `Home`, `Change Password`, `Manage Members` (Admin) or `Members` (User), and `Logout`.  

### 8. **Error Handling**
   - Warnings and errors (e.g., incorrect password, network issues) are displayed using **React-Toastify** notifications at the top-right corner.

### 9. **Responsiveness**
   - The UI is fully responsive, ensuring smooth user experience across devices of different screen sizes.

---

## Technologies Used
- **React** for UI Development  
- **React-Router** for navigation  
- **React-Toastify** for error and success notifications  
- **Mock API** for CRUD operations (optional)  

---

## Features in Action
1. **User Login/Signup Flow**  
2. **Role-Based Access Control**: Different workflows for `User` and `Admin`.  
3. **Secure and Dynamic UI**  
4. **Efficient Member Management** with Search and Pagination.  
5. **Error Handling** for enhanced user experience.  
6. **Responsive Design** for all devices.

---

### How to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository_url>
