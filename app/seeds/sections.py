from app.models import db, Section, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_sections():
    section1 = Section(
        name='Section 1',
        order=0,
        board_id=1
    )
    section2 = Section(
        name='Section 2',
        order=1,
        board_id=1
    )
    section3 = Section(
        name='Section 3',
        order=0,
        board_id=2
    )
    section4 = Section(
        name='Section 4',
        order=1,
        board_id=2
    )
    section5 = Section(
        name='Section 5',
        order=0,
        board_id=3
    )
    section6 = Section(
        name='Section 6',
        order=1,
        board_id=3
    )
    section7 = Section(
        name='Section 7',
        order=0,
        board_id=4
    )
    section8 = Section(
        name='Section 8',
        order=1,
        board_id=4
    )
    section9 = Section(
        name='Section 9',
        order=0,
        board_id=5
    )
    section10 = Section(
        name='Section 10',
        order=1,
        board_id=5
    )

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)
    db.session.add(section5)
    db.session.add(section6)
    db.session.add(section7)
    db.session.add(section8)
    db.session.add(section9)
    db.session.add(section10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_sections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sections"))

    db.session.commit()
