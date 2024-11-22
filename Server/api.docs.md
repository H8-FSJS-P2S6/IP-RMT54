# Hacktiv PokeDex Documentation

## Models

### Base Url
- https://ip-p2.brandon-hash268.online/
### User

- email: string, required, unique
- userName: string, required
- password: string, required
- role: string, defaults to "user"

### Favorite

- pokemonName: string, required
- UserId: integer, required

### Profile

- imgUrl: string, required, associated with User

---

## Endpoints

### Public Endpoints

- `POST /register` - Register a new user
- `POST /login` - Login an existing user
- `POST /googleLogin` - Login using Google OAuth

### Authentication Required

- `GET /favorites` - Get all favorites of the authenticated user
- `POST /favorites` - Add a new favorite for the authenticated user
- `GET /users` - Get details of the authenticated user
- `PATCH /users` - Update authenticated user's details
- `GET /profiles` - Retrieve all profiles
- `DELETE /favorites/:pokemonName` - Delete a favorite by pokemonName

### Admin Authentication Required

- `POST /profiles` - Create a new profile with an image

---

## Endpoints

### 1. Login

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Logs in a user with their credentials.
- **Success Response**:

**Request Body**

```json
{
  "email": "string",
  "userName": "string",
  "password": "string"
}
```

- **Success Response**:
  - **Status**: `200 OK`
    ```json
    {
      "access_token": "string"
    }
    ```
- **Error Response**:
  - **Status**: `400 Bad Request`
    Missing email:
    ```json
    {
      "message": "Email is required"
    }
    ```
    Missing password:
    ```json
    {
      "message": "Password is required"
    }
    ```
  - **Status**: `401 Unauthorized`
    Invalid login:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

### 2. Add User

- **URL**: `/register`
- **Method**: `POST`
- **Description**: Allows an admin to add a new user.
- **Success Response**:
  - **Status**: `201 Created`
  - **Response**:
    ```json
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "address": "string",
      "phoneNumber": "string"
    }
    ```
- **Error Response**:
  - **Status**: `400 Bad Request`
  - **Response**:
    ```json
    {
      "message": "User with that Email already Exist"
    }
    OR
    {
      "message": "Password is required"
    }
     OR
    {
      "message": "Email cant be empty"
    }
    ```

---

### 3. Google Login

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Logs in a user with their credentials.

**Request Body**

```json
{
  "token": "string"
}
```

- **Success Response**:
  - **Status**: `200 OK`
    ```json
    {
      "access_token": "string"
    }
    ```

---

### 4. GET /favorites

- **URL**: `/favorites`
- **Method**: `GET`
- **Description**: Retrieves all favorites of the authenticated user.

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- **Success Response**:

  - **Status**: `200 OK`

    ```json
    [
      {
        "pokemonName": "string",
        "UserId": "integer"
      }
    ]
    ```

---

### 5. POST /favorites

- **URL**: `/favorites`
- **Method**: `POST`
- **Description**: Adds a new favorite for the authenticated user.

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Request Body**

```json
{
  "pokemonName": "string"
}
```

- **Success Response**:

  - **Status**: `201 Created`

    ```json
    [
      {
        "pokemonName": "string",
        "UserId": "integer"
      }
    ]
    ```

---

### 6. GET /users

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Retrieves details of the authenticated user.

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- **Success Response**:

  - **Status**: `200 OK`

    ```json
    [
      {
        "id": "integer",
        "userName": "string",
        "email": "string",
        "role": "string"
      }
    ]
    ```

---

### 7. PATCH /users

- **URL**: `/users`
- **Method**: `PATCH`
- **Description**: Updates the authenticated user's details.

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Request Body**

```json
{
  "userName": "string",
  "ProfileId": "integer"
}
```

- **Success Response**:

  - **Status**: `200 OK`

    ```json
    [
      {
        "id": "integer",
        "userName": "string",
        "email": "string",
        "role": "string"
      }
    ]
    ```

---

### 8. GET /profiles

- **URL**: `/profiles`
- **Method**: `GET`
- **Description**: Retrieves all profiles.

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- **Success Response**:

  - **Status**: `200 OK`

    ```json
    [
      {
        "imgUrl": "string",
        "UserId": "integer"
      }
    ]
    ```

---

### 9. DELETE /favorites/:pokemonName

- **URL**: `/favorites/:pokemonName`
- **Method**: `DELETE`
- **Description**: Deletes a favorite by pokemonName

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- **Success Response**:

  - **Status**: `200 OK`

    ```json
    {
      "id": "integer",
      "pokemonName": "string"
    }
    ```

    - **Error Response**:

  - **Status**: `404 Not Found`
    Missing email:
    ```json
    {
      "message": "Pokemon not found"
    }
    ```

---

### 10. POST /profiles

- **URL**: `/profiles`
- **Method**: `POST`
- **Description**: Creates a new profile with an image (Admin only).

**Request Headers**

```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Request Body**

```json
{
  "imgUrl": "string"
}
```

- **Success Response**:

  - **Status**: `201 Created`

    ```json
    [
      {
        "pokemonName": "string",
        "UserId": "integer"
      }
    ]
    ```

    - **Error Response**:

  - **Status**: `400 Bad Request`
    Missing email:
    ```json
    {
      "message": "Image URL is required"
    }
    ```

---

### GLOBAL ERROR

- **Error Response**:
  - **Status**: `500 Internal Server Error`
  - **Response**:
    ```json
    {
      "message": "Internal server error"
    }
    ```
- **Status**: "401 Unauthorized/403 Forbidden"
  - **Response**:
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
       "message": "You are not authorized" 
    }
    ```
