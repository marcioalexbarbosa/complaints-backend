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
* eslint-config-standard
* istanbul
* mocha
* nock
* request
* request-promise
* sinon 

## How to run

1 - clone the repository

`git clone https://github.com/marcioalexbarbosa/complaints-backend.git`

2 - enter the project folder

`cd complaints-backend`

3 - build and run with docker-compose

`sudo docker-compose up`

## API

**Note:** There is a postman collection convenience file in the postman folder which can be imported into postman

- create a new complaint
    
    `POST /complaints`
    
```curl
curl -X POST \
  http://localhost:3000/complaints \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 467010bd-0f74-43eb-ac9d-8620fcb135a5' \
  -H 'cache-control: no-cache' \
  -d '{"title":"test", "description": "testing", "locale": "São Paulo", "company": "reclameaqui"}'
  ```

- retrieve all complaints
    
    `GET /complaints`

```curl
curl -X GET \
  http://localhost:3000/complaints \
  -H 'Postman-Token: 53020b12-ea6f-4a9b-80f3-0df59720ba9a' \
  -H 'cache-control: no-cache'
  ```
  
- retrieve a single complaint with id
   
   `GET /complaints/:id`

```curl
curl -X GET \
  http://localhost:3000/complaints/5c9eaf3ab26afc270cd9e639 \
  -H 'Postman-Token: 6db7c102-32e9-4808-9849-d0f3803d30bb' \
  -H 'cache-control: no-cache'
  ```
  
- update a complaint with id

    `PUT /complaints/:id`
    
```curl
curl -X PUT \
  http://localhost:3000/complaints/5c9eaf3ab26afc270cd9e639 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: ef03de0b-468a-4ca3-a414-18e04ba7f567' \
  -H 'cache-control: no-cache' \
  -d '{"title": "another", "description": "testing"}'
  ```

- delete a complaint with id
   
   `DELETE /complaints/:id`
   
```curl
curl -X DELETE \
  http://localhost:3000/complaints/5c9eae91b26afc270cd9e637 \
  -H 'Postman-Token: 920bac8f-700f-4d99-ac06-97629ea13936' \
  -H 'cache-control: no-cache'
  ```

- group locales by company
    
    `GET /complaints/locale/:name`

```curl
curl -X GET \
  http://localhost:3000/complaints/locale/Campinas \
  -H 'Postman-Token: 59ab8313-7e21-4c73-aeb4-63c79ab65717' \
  -H 'cache-control: no-cache'
  ```
  
- calculate the distance (locales) between two complaints

    `GET /complaints/distance/:id1/:id2`

```curl
curl -X GET \
  http://localhost:3000/complaints/distance/5c9eaf2eb26afc270cd9e638/5c9eaf3ab26afc270cd9e639 \
  -H 'Postman-Token: d7443b8f-440f-4fc6-bade-f790da933312' \
  -H 'cache-control: no-cache'
  ```

## How to run the tests


## How to run

1 - clone the repository

`git clone https://github.com/marcioalexbarbosa/complaints-backend.git`

2 - enter the project folder

`cd complaints-backend`

3 - install the required modules

`npm install`

4 - run the tests

`npm test`

or

`npm run coverage`
