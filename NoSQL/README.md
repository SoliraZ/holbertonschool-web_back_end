# NoSQL Project 🚀📂

This directory contains scripts and Python functions to interact with MongoDB, demonstrating various database operations such as listing databases, inserting documents, querying collections, and more. 🌟

## Table of Contents 📖

1. **List All Databases**
   - `0-list_databases`: Script to list all databases in MongoDB. 🗂️

2. **Create or Use a Database**
   - `1-use_or_create_database`: Script to create or use a database named `my_db`. 🛠️

3. **Insert Document**
   - `2-insert`: Script to insert a document with the attribute `name` set to `Holberton school` into the `school` collection. ➕

4. **List All Documents**
   - `3-all`: Script to list all documents in the `school` collection. 📋

5. **List All Matches**
   - `4-match`: Script to list all documents with `name="Holberton school"` in the `school` collection. 🔍

6. **Count Documents**
   - `5-count`: Script to display the number of documents in the `school` collection. 🔢

7. **Update Document**
   - `6-update`: Script to add a new attribute `address` with the value `972 Mission street` to documents with `name="Holberton school"`. ✏️

8. **Delete by Match**
   - `7-delete`: Script to delete all documents with `name="Holberton school"` in the `school` collection. 🗑️

9. **List All Documents in Python**
   - `8-all.py`: Python function `list_all` to list all documents in a collection. 🐍

10. **Insert Document in Python**
    - `9-insert_school.py`: Python function `insert_school` to insert a new document in a collection based on `kwargs`. ➕🐍

11. **Change School Topics**
    - `10-update_topics.py`: Python function `update_topics` to change all topics of a school document based on the name. 🔄

12. **Find Schools by Topic**
    - `11-schools_by_topic.py`: Python function `schools_by_topic` to return the list of schools having a specific topic. 📚

13. **Log Stats**
    - `12-log_stats.py`: Python script to provide stats about Nginx logs stored in MongoDB, including method counts and status checks. 📊

## How to Run 🏃‍♂️

Each script or function can be executed independently. For example, to test the `list_all` function in `8-all.py`, you can use the following commands:

```bash
guillaume@ubuntu:~/$ cat 8-main.py
#!/usr/bin/env python3
""" 8-main """
from pymongo import MongoClient
list_all = __import__('8-all').list_all

if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')
    school_collection = client.my_db.school
    schools = list_all(school_collection)
    for school in schools:
        print("[{}] {}".format(school.get('_id'), school.get('name')))

guillaume@ubuntu:~/$ ./8-main.py
[5a8f60cfd4321e1403ba7ab9] Holberton school
[5a8f60cfd4321e1403ba7aba] UCSD
guillaume@ubuntu:~/$
```

## Repository 📂

- **GitHub repository**: [holbertonschool-web_back_end](https://github.com/holbertonschool-web_back_end)
- **Directory**: `NoSQL`

Happy coding! 💻✨