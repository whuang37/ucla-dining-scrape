# Fall 2021 CS 35L Project - Dining Log

The UCLA Dining Log is a web application for UCLA students living on campus to plan out their daily meals at one of the many dine-in dining halls. Students can create an account and filter foods based on caloric intake, dietary restrictions, and hall.

## Installation

Run the following command to download the necessary code.
```
git clone https://github.com/whuang37/ucla-dining-scrape.git
```

In order to set up all necessary dependencies for the web application, download Node.js and run the following commands in the created git repository.

```
cd server
npm install
npm install -g nodemon

cd ..

cd dining-log
npm install
```

In order to setup the environment for the Python data scraper, run the following commands in the repo with the pip package manager installed.

```
cd food_scraper
pip install -r requirements.txt
```

## Running the Web Application

In order to run the Web Application, run the following two command blocks in two separate terminals from the repository root.

```
cd server
nodemon server
```
If nodemon errors, run using node.

```
cd dining-log
npm start
```

The web application should run on your default browser under a localhost url.


## Team members:
- William Huang
- Maggie Li
- Ryan Nguyen
- Rohan Srivastava
- Tracy Zhao

## Acknowledgements

This website was built using the [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial).

Special thanks to the Fall 2021 UCLA CS 35L staff and professor Eggert for their generous assistance and work.