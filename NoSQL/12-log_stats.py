#!/usr/bin/env python3
""" This script counts the number of documents in a NoSQL database. """


from pymongo import MongoClient


def log_stats(mongo_collection):
    """ Provides some stats about the school collection. """
    client = MongoClient('localhost', 27017)
    db = client.logs
    collection = db.nginx

    total_logs = collection.count_documents({})
    print(f"{total_logs} logs")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    print("Methods:")

    for method in methods:
        method_count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {method_count}")

    status_count = collection.count_documents({"method": "GET", "path": "/status"})
    print(f"{status_count} status check")


if __name__ == "__main__":
    log_stats()
