# API Documentation

## Base URL



## Middleware
- **CORS**: Enabled for all routes.
- **Authentication**: Required for routes following the user routes.

## Endpoints

### Welcome Page
- **GET** `/`
  - Returns a welcome message.

### User Routes

#### Register
- **POST** `/register`
  - **Request Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **201 Created**: 
      ```json
      {
        "message": "Register Success",
        "username": "string",
        "email": "string"
      }
      ```

#### Login
- **POST** `/login`
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **200 OK**: 
      ```json
      {
        "access_token": "string"
      }
      ```
    - **400 Bad Request**: Invalid email or password.

#### Google Login
- **POST** `/google-login`
  - **Headers**:
    - `token`: Google ID token
  - **Response**:
    - **200 OK**: 
      ```json
      {
        "access_token": "string"
      }
      ```

### Comment Routes

#### Create Comment
- **POST** `/comments`
  - **Request Body**:
    ```json
    {
      "comment": "string"
    }
    ```
  - **Response**:
    - **201 Created**: 
      ```json
      {
        "id": "integer",
        "userId": "integer",
        "comment": "string"
      }
      ```

#### Get All Comments
- **GET** `/comments`
  - **Response**:
    - **200 OK**: 
      ```json
      [
        {
          "id": "integer",
          "userId": "integer",
          "comment": "string"
        }
      ]
      ```

#### Get Comment by ID
- **GET** `/comments/:id`
  - **Response**:
    - **200 OK**: 
      ```json
      {
        "id": "integer",
        "userId": "integer",
        "comment": "string"
      }
      ```
    - **404 Not Found**: Comment not found.

#### Update Comment
- **PUT** `/comments/:id`
  - **Request Body**:
    ```json
    {
      "comment": "string"
    }
    ```
  - **Response**:
    - **200 OK**: 
      ```json
      {
        "id": "integer",
        "userId": "integer",
        "comment": "string"
      }
      ```
    - **404 Not Found**: Comment not found.

#### Delete Comment
- **DELETE** `/comments/:id`
  - **Response**:
    - **204 No Content**: Comment deleted.
    - **404 Not Found**: Comment not found.

### Like Routes

#### Create Like
- **POST** `/likes`
  - **Request Body**: 
    ```json
    {
      // like data
    }
    ```
  - **Response**:
    - **201 Created**: Like object.

#### Get All Likes
- **GET** `/likes`
  - **Response**:
    - **200 OK**: Array of like objects.

#### Get Like by ID
- **GET** `/likes/:id`
  - **Response**:
    - **200 OK**: Like object.
    - **404 Not Found**: Like not found.

#### Update Like
- **PUT** `/likes/:id`
  - **Request Body**: 
    ```json
    {
      // updated like data
    }
    ```
  - **Response**:
    - **200 OK**: Updated like object.
    - **404 Not Found**: Like not found.

#### Delete Like
- **DELETE** `/likes/:id`
  - **Response**:
    - **204 No Content**: Like deleted.
    - **404 Not Found**: Like not found.

### Watchlist Routes

#### Create Watchlist
- **POST** `/watchlist`
  - **Request Body**: 
    ```json
    {
      // watchlist data
    }
    ```
  - **Response**:
    - **201 Created**: Watchlist object.

#### Get All Watchlists
- **GET** `/watchlist`
  - **Response**:
    - **200 OK**: Array of watchlist objects.

#### Get Watchlist by ID
- **GET** `/watchlist/:id`
  - **Response**:
    - **200 OK**: Watchlist object.
    - **404 Not Found**: Watchlist not found.

#### Update Watchlist
- **PUT** `/watchlist/:id`
  - **Request Body**: 
    ```json
    {
      // updated watchlist data
    }
    ```
  - **Response**:
    - **200 OK**: Updated watchlist object.
    - **404 Not Found**: Watchlist not found.

#### Delete Watchlist
- **DELETE** `/watchlist/:id`
  - **Response**:
    - **204 No Content**: Watchlist deleted.
    - **404 Not Found**: Watchlist not found.

## Error Handling
Errors will be handled through a middleware that sends appropriate status codes and messages.

### Error Responses
- **400 Bad Request**: 
  - Example: 
    ```json
    {
      "message": "Invalid request data."
    }
    ```
- **401 Unauthorized**: 
  - Example: 
    ```json
    {
      "message": "Access token is required"
    }
    ```
- **403 Forbidden**: 
  - Example: 
    ```json
    {
      "message": "You do not have permission to access this resource."
    }
    ```
- **404 Not Found**: 
  - Example: 
    ```json
    {
      "message": "Resource not found."
    }
    ```
- **500 Internal Server Error**: 
  - Example: 
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

This documentation provides a comprehensive overview of the API endpoints, their request and response formats, and error handling mechanisms based on your error handling code.


