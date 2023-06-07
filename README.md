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

   * `GET /boards` view all boards
   * `POST /boards` create a new board
   * `GET /boards/{board_id}` view single board
   * `DELETE /boards/{board_id}` delete single board
   * `GET /boards/{board_id}/sections` view sections of board
   * `POST /boards/{board_id}/sections` create section of board

* `/sections`

   * `GET /sections/{section_id}` get single section by id
   * `PUT /sections/{section_id}` update single section
   * `DELETE /sections/{section_id}` delete single section

* `/tasks`

   * `GET /tasks` get all tasks
   * `POST /tasks` create new task
   * `GET /tasks/{task_id}` get task by id
   * `PUT /tasks/{task_id}` update single task
   * `DELETE /tasks/{task_id}` delete single task

* `/profile`

   * `GET /profile` get profile of user
   * `PUT /profile` update user profile
   * `DELETE /profile` delete user

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
