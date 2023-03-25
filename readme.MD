## Library Management System

**This branch is still under construction, renovationg whole system from scratch. Some code might not work as expected**

### Description

This is more of my experimental ground to try new stuff than a _Library Management System_. In brief, functionalities are

- User
  - Login
  - Register
  - Borrow, renew and return book
  - Browse books catalog
  - Can see own activities in dashboard in realtime
  - Can update personal information
- Admin
  - Login
  - Register
  - Browse books
  - Block user from the system
  - Add new book
  - Update existing book info
  - Delete existing book from the system
  - Set visibility of a book in catalog(public/private)
  - Can see user activities in dashboard in realtime
  - Create new admin account
  - Update own admin profile information
  - Delete own account
  - Role based access control(Future feature :p )

### System description

Whole system is divided into _client_, _server_ module, UI logic resides in client module and server side logic reside in server module.

To run each module, please look into each modules package.json script, there's a command to run the app
