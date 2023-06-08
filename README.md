# Asante

### A project management web application inspired by Asana.

Live site: [Asante](https://asante.onrender.com/)

## Technologies Used
![python](https://github.com/ExcuseMeImJack/asante/assets/107484881/6d6f71d1-4c28-4089-a3b0-e60c46e5421f)
![flask](https://github.com/ExcuseMeImJack/asante/assets/107484881/2e4d1a7e-68f3-41a0-959b-99447cd93ab3)
![postgresql](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/889cbdc9-811c-408d-a075-9cd4ee9e3cbf)
![html5](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/de294ad9-fa73-4183-a5de-cb2998f31f03)
![css3](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/023a7ed5-f5fc-41db-8735-a00b5d47ad64)
![js](https://github.com/ExcuseMeImJack/asante/assets/107484881/0c9d211b-a02f-4dac-995a-adeb29497a45)
![react](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/b24e48ca-1a01-44b8-a856-db324ec3ee46)
![redux](https://github.com/RMPasta/AirBnB-Clone/assets/107484881/a65d6db5-c45a-4dc4-84bc-7962a62beaa1)

## Landing Page
![splash](https://github.com/ExcuseMeImJack/asante/assets/107484881/d220dfe9-ae2c-4b8c-abeb-15a284fb0133)

## Home
![home](https://github.com/ExcuseMeImJack/asante/assets/107484881/fc5a2322-d443-4ed2-a640-b173c235ac75)

## Profile
![user-profile](https://github.com/ExcuseMeImJack/asante/assets/107484881/3dfaf3e8-0b34-4142-b791-90fd547751e8)

## Project Board
![board-page](https://github.com/ExcuseMeImJack/asante/assets/107484881/35e87c9c-3908-4415-b65f-618fd723b073)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. Navigate to the react-app directory, install the dependencies and start the react front end

```bash
npm install
```

```bash
npm start
```
8. Open the locally hosted front end at the specified port.

### Features

1. New account creation, log in, log out, and guest/demo login
    - Users can sign up, log in, and log out.
    - Users can use a demo log in to try the site.
    - Users can't use ANY features without logging in.
    - Logged in users are directed to their dashboard/homepage where it displays their tasks, boards, and frequent collaborators.
    - Logged out users are directed to the landing page.

2. Board Creation & Management
    - Users can create new boards.
    - Users can set board goals and deadlines.
    - Users can set priority tags + due dates for tasks.

3. Columns Management
    - Users can create columns on a board
    - Users can update columns on a board
    - Users can view columns on a board
    - Users can delete columns on a board
    - Users can rearrange columns on a board in any order

4. Task Management
    - Users can view their assigned tasks and deadlines in a task list or calendar view.
    - Users can set reminders for tasks and deadlines.
    - Users can mark tasks as complete or incomplete.
    - Users can track the time the time they’ve spent on tasks.
    - Users can rearrange task in any column in any order

5. Profiles
    - Users can view their profile details
    - Users can update their profile details
    - Users can delete their profile

### API-ROUTES

* `/boards`
    * `GET /boards/{board_id}/sections`
        * Purpose: Get all sections by Board ID
        * Return: `{'sections': [{'id': 1, 'name': 'Test Section', ...}, {'id': 2, 'name': 'Test Section', ...}, ...]}`
    * `POST /boards`
        * Purpose: Create a board for the Current User
        * Return: `{"Board": {'id': 1, 'name': 'Test Board', ...}}`
    * `GET /boards/{board_id}`
        * Purpose: Get a single Board by Board ID
        * Return `{"Board": {'id': 1, 'name': 'Test Board', ...}}`
    * `DELETE /boards/{board_id}`
        * Purpose: Delete a Board by Board ID
        * Return: `{'message': 'Successfully deleted!'}`

* `/sections`
    * `GET /sections`
        * Purpose: Get all Sections without a Board ID
        * Return: `{'sections': [{'id': 1, 'name': 'Test Section', ...}, {'id': 2, 'name': 'Test Section', ...}, ...]}`
    * `GET /sections/{section_id}`
        * Purpose: Get a single Section by Section ID
        * Return: `{"Section": {'id': 1, 'name': 'Test Section', ...}}`
    * `PUT /sections/{board_id}/move`
        * Purpose: Reorder the Sections by Board ID when moved by the User
        * Return: `{'sections': [{'id': 1, 'name': 'Test Section', ...}, {'id': 2, 'name': 'Test Section', ...}, ...]}`
    * `PUT /sections/{section_id}`
        * Purpose: Edit a single Section by Section ID
        * Return: `{"Section": {'id': 1, 'name': 'Test Section', ...}}`
    * `POST /sections/{board_id}`
        * Purpose: Create a Section to a Board by Board ID
        * Return: `{"Section": {'id': 1, 'name': 'Test Section', ...}}`

* `/tasks`
    * `GET /tasks/{task_id}`
        * Purpose: Get a single Task by Task ID
        * Return: `{ "Task":  {'id': 1, 'name': 'Test Task', ...}}`
    * `GET /tasks/section/{section_id}`
        * Purpose: Get all the Tasks for a Section by Section ID
        * Return: `{'Tasks': [{'id': 1, 'name': 'Test Task', ...}, {'id': 2, 'name': 'Test Task', ...}, ...]}`
    * `PUT /tasks/{section_id/move}`
        * Purpose: Reorder the Tasks by Section ID when moved by the User
        * Return: `{'Tasks': [{'id': 1, 'name': 'Test Task', ...}, {'id': 2, 'name': 'Test Task', ...}, ...]}`
    * `PUT /tasks/{task_id}`
        * Purpose: Edit a single Task by Task ID
        * Return: `{ "Task":  {'id': 1, 'name': 'Test Task', ...}}`
    * `DELETE /tasks/{task_id}`
        * Purpose: Delete a single Task by Task ID
        * Return: `{'message': 'Successfully deleted!'}`

* `/users`
    * `GET /users/tasks`
        * Purpose: Get all the Tasks of the Current User
        * Return: `{'Tasks': [{'id': 1, 'name': 'Test Task', ...}, {'id': 2, 'name': 'Test Task', ...}, ...]}`
    * `GET /users/boards`
        * Purpose: Get all the Boards of the Current User
        * Return: `{'Boards: [{'id': 1, 'name': 'Test Board', ...}, {'id': 2, 'name': 'Test Board', ...}, ...]}`
    * `GET /users`
        * Purpose: Get the Profile of the Current User
        * Return: `user: {'id': 1, 'username': 'Tester', ...}`
    * `POST /users/task/{section_id}`
        * Purpose: Create a task by Section ID
        * Return: `{ "Task":  {'id': 1, 'name': 'Test Task', ...}}`
    * `PUT /users`
        * Purpose: Edit the Profile of the Current User
        * Return: `{'id': 1, 'username': 'Tester', ...}`
    * `DELETE /users`
        * Purpose: Delete the Current User
        * Return: `{'message': 'Successfully deleted!'}`

### Built by

Jack
- https://github.com/ExcuseMeImJack
- https://www.linkedin.com/in/jack-roybal-719909264/

Wyona
- https://github.com/Kariyona
- https://www.linkedin.com/in/wyona-b-602677224/

David
- https://github.com/koreanpro22
- https://www.linkedin.com/in/david-kim-a37b59274/

Ryan
- https://github.com/RMPasta
- https://www.linkedin.com/in/ryan-malmos/
