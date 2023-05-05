from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        name='Demo',
        about_me="I'm a great person and I love Python!",
        profile_pic_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Coding-Brain-01-press_0.jpg"
    )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        name='Marnie',
        about_me="I'm a great person and I love Python!",
        profile_pic_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Coding-Brain-01-press_0.jpg"
    )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        name='Bobbie',
        about_me="I'm a great person and I love Python!",
        profile_pic_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Coding-Brain-01-press_0.jpg"
    )
    tester = User(
        username='tester',
        email='tester@aa.io',
        password='password',
        name='Elam Sander',
        about_me="I'm a great person and I love Python!",
        profile_pic_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Coding-Brain-01-press_0.jpg"
    )
    tester1 = User(
        username='tester1',
        email='tester1@aa.io',
        password='password',
        name='Roland Hemingr',
        about_me="I'm a great person and I love Python!",
        profile_pic_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Coding-Brain-01-press_0.jpg"
    )
    tester2 = User(
        username='tester2',
        email='tester2@aa.io',
        password='password',
        name='Dumuzid Patric',
        about_me="I'm a great person and I love Python!",
        profile_pic_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202012/MIT-Coding-Brain-01-press_0.jpg"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tester)
    db.session.add(tester1)
    db.session.add(tester2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
