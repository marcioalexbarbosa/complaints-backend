# complaints-backend
A backend to store complaints in a mongodb database.

## Backend Engineer Challenge

### Problem

We need to research about locales where consumer complaints are made. That complains should have at least the attributes described bellow:

 - Title
 - Description
 - Locale
 - Company

Can you provide some services to ingest complaints and get some data about its geolocation? For example, to find how many complaints a specific company has in a specific city?

## Modules used in the project

### dependencies

* all-the-cities
* body-parser
* express
* geo-distance
* mongoose

### dev dependencies

* chai
* eslint
* mocha
* sinon 

## API

- create a new complaint
    
    `POST /complaints`

- retrieve all complaints
    
    `GET /complaints`

- retrieve a single complaint with id
   
   `GET /complaints/:id`

- update a complaint with id

    `PUT /complaints/:id`

- delete a complaint with id
   
   `DELETE /complaints/:id`

- group locales by company
    
    `GET /complaints/locale/:name`

- calculate the distance (locales) between two complaints

    `GET /complaints/distance/:id1/:id2`

