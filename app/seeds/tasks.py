from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, date


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    task1 = Task(
        name='Task 1',
        order=0,
        section_id=1,
        due_date=datetime(2024, 3, 10),
        user_id='1'
    )
    task2 = Task(
        name='Task 2',
        order=1,
        description='This is task numero dos',
        section_id=2,
        due_date=datetime(2024, 9, 7),
        user_id='1'
    )
    task3 = Task(
        name='Task 3',
        order=0,
        section_id=3,
        due_date=datetime(2024, 8, 29),
        user_id='2'
    )
    task4 = Task(
        name='Task 4',
        order=1,
        description='This is task numero quatro',
        section_id=4,
        due_date=datetime(2024, 6, 18),
        user_id='2'
    )
    task5 = Task(
        name='Task 5',
        order=0,
        section_id=5,
        due_date=datetime(2024, 1, 11),
        user_id='3'
    )
    task6 = Task(
        name='Task 6',
        order=1,
        description='This is task numero seis',
        section_id=6,
        due_date=datetime(2024, 5, 23),
        user_id='3'
    )
    task7 = Task(
        name='Task 7',
        order=0,
        section_id=7,
        due_date=datetime(2024, 11, 28),
        user_id='4'
    )
    task8 = Task(
        name='Task 8',
        order=1,
        description='This is task numero ocho',
        section_id=8,
        due_date=datetime(2024, 12, 25),
        user_id='4'
    )
    task9 = Task(
        name='Task 9',
        order=0,
        section_id=9,
        due_date=datetime(2024, 12, 7),
        user_id='5'
    )
    task10 = Task(
        name='Task 10',
        order=1,
        description='This is task numero diez',
        due_date=datetime(2024, 7, 1),
        section_id=10,
        user_id='5'
    )
    task11 = Task(
        name='Task 11',
        order=0,
        description='This is task numero once',
        section_id=2,
        due_date=datetime(2024, 7, 10),
        user_id='1'
    )
    task12 = Task(
        name='Task 12',
        order=0,
        description='This is task numero doce',
        section_id=4,
        due_date=datetime(2024, 9, 15),
        user_id='2'
    )
    task13 = Task(
        name='Task 13',
        order=0,
        description='This is task numero trece',
        section_id=6,
        due_date=datetime(2024, 10, 10),
        user_id='3'
    )
    task14 = Task(
        name='Task 14',
        order=0,
        description='This is task numero catorce',
        section_id=8,
        due_date=datetime(2024, 10, 31),
        user_id='4'
    )
    task15 = Task(
        name='Task 15',
        order=0,
        description='This is task numero quince',
        section_id=10,
        due_date=datetime(2024, 2, 22),
        user_id='5'
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)
    db.session.add(task13)
    db.session.add(task14)
    db.session.add(task15)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
