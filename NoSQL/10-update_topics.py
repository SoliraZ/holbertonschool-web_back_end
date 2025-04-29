#!/usr/bin/env python3
""" This script updates topics in a NoSQL database. """


def update_topics(mongo_collection, name, topics):
    """ Updates the topics of a school document based on the name."""
    return mongo_collection.update_many({"name": name}, {"$set": {"topics": topics}})
