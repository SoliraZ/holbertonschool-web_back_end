#!/usr/bin/env python3
"""Module for log_stats function"""
from pymongo import MongoClient


def log_stats():
    """provides some stats about Nginx logs stored in MongoDB"""
    client = MongoClient('localhost', 27017)
    db = client.logs
    collection = db.nginx

    logs_qty = collection.count_documents({})
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    status_check = collection.count_documents({
        "method": "GET",
        "path": "/status"
        })

    print(f"{logs_qty} logs")
    print("Methods:")
    for method in methods:
        method_qty = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {method_qty}")
    print(f"{status_check} status check")


if __name__ == "__main__":
    log_stats()
