# Moffat-Bay

## Purpose of Application
The Moffat Bay Lodge (The Cozy Cavern) web application allows customers to explore the lodge and its offerings freely. The website allows them to book their reservation through our secure registration and login system. Guests are able to view the lodge's attractions, contact information, and other general information without having an account. But, to book a reservation, users must create a free account and log into the website. Registered users are able to select room preferences, input their details, and confirm/look up their stay. 

Once confirmed, the reservations are stored in the database and may be viewed later through the Reservation Lookup feature. The application has key pages such as the landing page, about us, contact us, attractions, amenities, registration, login, lodge reservation, reservation summary, and reservation lookup. All user data and reservations are securely handled by utilizing proper input validation and password encryption.

<hr>

## Tools Used
* Frontend
    * HTMl
    * CSS
    * JavaScript
* Backend
    * Node
    * Express
    * Sequelize
* Other
    * Bycrypt for hasing passwords
    * dotenv for handling environment variables
    * Bruno / Insomnia for testing api calls
        * https://www.usebruno.com/
        * https://insomnia.rest/

## Instructions for Running Locally
* Clone down repository
* Install Node.js
* Install MySQL (MySQL Workbench recommended)
* In MySQL create database title 'MoffatBayLodge'
* Open IDE (VsCode recommended)
* In root level of project, create a `.env` file
* Copy and paste the contents of `.env.example` into your new `.env` file
* In your `.env` file, replace the values for database name, username, and password to that of your local MySQL setup
* Open an integrated terminal
* Run `npm i`, this will install all dependencies listed in the `package.json`
* Run `npm run seed` to seed the database with dummy data
* Run `npm start` to start the server, you should see `Server running at http://localhost:3001`
* Go to `http://localhost:3001` in your browser to view the homepage of the application


### Authors
* Roald Medendorp
* Austen R Erickson
* Deena Linehan
* Giabella Apo
* Kristina Vasquez
* Violet Gonzalez
* Thunder Harding

<hr>
