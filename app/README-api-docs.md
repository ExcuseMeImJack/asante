# Asante API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User / Authenticate Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/auth/
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "user": {
            "about_me": "I'm a great person!",
            "created_at": "Fri, 05 May 2023 00:00:00 GMT",
            "email": "tester@aa.io",
            "id": 4,
            "name": "Elam Sander",
            "profile_pic_url": "image.url",
            "updated_at": "Fri, 05 May 2023 00:00:00 GMT",
            "username": "tester"
        }
    }

    ```
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "tester@aa.io",
      "password": "password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "user": {
            "about_me": "I'm a great person!",
            "created_at": "Fri, 05 May 2023 00:00:00 GMT",
            "email": "tester@aa.io",
            "id": 4,
            "name": "Elam Sander",
            "profile_pic_url": "image.url",
            "updated_at": "Fri, 05 May 2023 00:00:00 GMT",
            "username": "tester"
        }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "errors": [
            "email : Email provided not found.",
            "password : Password was incorrect."
        ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "errors": [
            "email : Email provided not found.",
            "password : No such user exists."
        ]
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "username": "tester4",
        "email": "tester4@aa.io",
        "password": "password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "about_me": null,
        "created_at": "Sat, 06 May 2023 00:00:00 GMT",
        "email": "tester4@aa.io",
        "id": 7,
        "name": "Jeremy",
        "profile_pic_url": null,
        "updated_at": "Sat, 06 May 2023 00:00:00 GMT",
        "username": "tester4"
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "errors": [
            "email : Email address is already in use."
        ]
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "errors": [
            "username : Username is already in use."
        ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "errors": [
            "username : This field is required.",
            "email : This field is required.",
            "password : This field is required."
        ]
    }
    ```

### Log a User Out

Logs out the current user and returns a success message.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/logout
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "message": "User logged out"
    }
    ```
