[Back to Portfolio](./)

Project 1 Title
===============

-   **Class:** CSCI 497/498/499
-   **Grade:** --/100 (Pending final grade)
-   **Language(s):** Primarily Java
-   **Source Code Repository:** [FathersOfTheFaith]([https://guides.github.com/features/mastering-markdown/](https://github.com/JakeHamacher/FathersOfTheFaith))  
    (Please [email me](mailto:jhhamacher@csustudent.net?subject=GitHub%20Access) to request access.)

## Project description

This web application is a project designed to provide an online archive of documents written by the Church Fathers. The application allows users to search, sort, and filter documents based on various criteria, including author, scripture references, and century. It was developed as a web application using Vaadin for the user interface and Maven for project management and dependency management.

The application is designed to be deployed using Docker for containerization and hosted on Google Cloud for scalability and reliability.

## How to compile and run the program

The website can be accessed [here](fathersofthefaith.org)

Or you may run locally like this:
To create a production build, call 
`mvnw clean package -Pproduction` (Windows), or `./mvnw clean package -Pproduction` (Mac & Linux). 
This will build a JAR file with all the dependencies and front-end resources, ready to be deployed. The file can be found in the target folder after the build completes.

Once the JAR file is built, you can run it using `java -jar target/myapp-1.0-SNAPSHOT.jar`

## UI Design

The program is pretty intuitive. On the left-hand side, there is a menu that allows you to sort and filter through documents. On the top Navbar you can search the documents, you can clear all settings and you can switch between a light and dark theme.

[Back to Portfolio](./)
