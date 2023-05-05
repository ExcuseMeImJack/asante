from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_boards():
    board1 = Board(
        name='Board 1'
    )
    board2 = Board(
        name='Board 2'
    )
    board3 = Board(
        name='Board 3'
    )
    board4 = Board(
        name='Board 4'
    )
    board5 = Board(
        name='Board 5'
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
