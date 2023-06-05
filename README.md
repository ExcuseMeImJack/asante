# Asante

### An Asana clone built with Python, Flask, React, and Redux.

Live site: https://asante.onrender.com/

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

### More information

Visit our github wiki for site documentation!

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
