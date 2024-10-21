# Deadbeat Dads Tracker

## Project Description
The **Deadbeat Dads Tracker** is a web application designed to help users keep track of irresponsible fathers who fail to provide child support. The app allows users to add deadbeat dads, upload their images, and manage the list efficiently. Admins can remove entries after verifying their credentials.

## Instructions for Setup

### Required Software
Before setting up the project, ensure you have the following software installed on your machine:

- [PHP](https://www.php.net/downloads) (version 7.2 or higher)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (version 5.7 or higher)
- A web server like [XAMPP](https://www.apachefriends.org/index.html) or [WAMP](http://www.wampserver.com/en/)

### Setting Up the Project

1. **Clone the Repository or Download the Project**
   - If using Git, clone the repository:
     ```bash
     git clone <repository-url>
     ```
   - Alternatively, download the ZIP file and extract it to your desired location.

2. **Import the Database**
   - Open your MySQL client (e.g., phpMyAdmin).
   - Create a new database (e.g., `deadbeat_dads_tracker`).
   - Select the newly created database and navigate to the "Import" tab.
   - Click on "Choose File" and select the `database.sql` file located in the project folder.
   - Click on "Go" to import the database.

3. **Configure Database Connection**
   - Open the `db.php` file located in the root of your project folder.
   - Update the database connection details as follows:
     ```php
     $host = 'localhost'; // Change if using a different host
     $dbname = 'deadbeat_dads_tracker'; // Database name
     $username = 'your_username'; // Your MySQL username
     $password = 'your_password'; // Your MySQL password

     try {
         $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     } catch (PDOException $e) {
         echo "Connection failed: " . $e->getMessage();
     }
     ```

4. **Open the App in Your Browser**
   - Start your XAMPP or WAMP server.
   - Place the project folder inside the `htdocs` folder (for XAMPP) or the `www` folder (for WAMP).
   - Open your web browser and navigate to:
     ```
     http://localhost/<project-folder-name>/
     ```
   - Replace `<project-folder-name>` with the actual name of your project folder.

## Additional Information
- Ensure that you have error reporting enabled in PHP during development to assist with debugging:
  ```php
  error_reporting(E_ALL);
  ini_set('display_errors', 1);


For further development, refer to the code documentation and comments within the files.
Feel free to contribute or report any issues you encounter during setup!