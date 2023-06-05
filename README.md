# Asante

### An Asana clone built with Python, Flask, React, and Redux.

Live site: https://asante.onrender.com/

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
