# Code Documentation for Deadbeat Dads Tracker

## Overview
The **Deadbeat Dads Tracker** is a web application that allows users to manage a list of irresponsible fathers who fail to provide child support. The application is built using PHP, HTML, CSS, and JavaScript.


### Files and Functionality

#### 1. `db.php`
- **Purpose**: Establishes a connection to the MySQL database using PDO.
- **Key Variables**:
  - `$host`: Database host, typically 'localhost'.
  - `$dbname`: The name of the database to connect to.
  - `$username`: MySQL username.
  - `$password`: MySQL password.
- **Error Handling**: Uses `try-catch` blocks to handle connection errors and throws exceptions if the connection fails.

#### 2. `deadbeat.php`
- **Purpose**: Handles all backend operations related to deadbeat dads, including adding, removing, and fetching records.
- **Functionality**:
  - **Adding a Deadbeat**:
    - Checks if `add_deadbeat` is set in the POST request.
    - Validates input data and executes an SQL `INSERT` query to add the deadbeat to the database.
  - **Removing a Deadbeat**:
    - Checks if `remove_deadbeat` is set in the POST request.
    - Validates admin credentials and the deadbeat ID.
    - Executes an SQL `DELETE` query to remove the deadbeat from the database.
  - **Fetching All Deadbeats**:
    - Checks if `get_deadbeats` is set in the GET request.
    - Executes an SQL `SELECT` query to fetch all records and returns them as a JSON response.

#### 3. `upload.php`
- **Purpose**: Handles image uploads for deadbeat dads.
- **Functionality**:
  - Validates and moves uploaded image files to a designated directory.
  - Returns the path of the uploaded image as a JSON response for further processing.

#### 4. `dashboard.html`
- **Purpose**: The main user interface of the application.
- **Key Features**:
  - Displays a list of deadbeat dads with options to add or remove entries.
  - Contains forms for adding new deadbeat dads and a modal for confirming deletions.
  - Includes a header and buttons styled with CSS.

#### 5. `dashboard.js`
- **Purpose**: Manages client-side functionality and interactions.
- **Key Functions**:
  - `openAddForm()`: Displays the form for adding a new deadbeat.
  - `displayDeadbeats()`: Fetches and displays all deadbeat dads from the backend.
  - `openDeleteModal(id)`: Opens a modal for confirming deletion of a deadbeat, passing the ID of the selected deadbeat.
  - `closeModal()`: Closes the deletion confirmation modal.
  - Handles form submissions for adding and deleting deadbeat dads.

#### 6. `dashboard.css`
- **Purpose**: Styles the application to improve user experience.
- **Key Styles**:
  - Styles for the header, buttons, cards, forms, and modal components.
  - Uses a grid layout for displaying deadbeat cards.
  - Adds hover effects for buttons and responsive design considerations.

### Database Schema
- **Table: `deadbeat_dads`**
  - **Columns**:
    - `id`: INT, primary key, auto-increment.
    - `name`: VARCHAR(255), name of the deadbeat dad.
    - `children`: INT, number of children.
    - `image`: VARCHAR(255), path to the uploaded image.

### Error Handling
- Uses PHP's error reporting to display errors during development.
- Returns JSON responses with error messages for failed operations.

### Future Enhancements
- Implement user authentication to manage access levels for admins and regular users.
- Add a search feature to quickly find specific deadbeat dads.
- Improve image upload handling with more robust validation (e.g., file type checks).

## Conclusion
This documentation outlines the structure, functionality, and key components of the Deadbeat Dads Tracker application. For any questions or contributions, please reach out!

