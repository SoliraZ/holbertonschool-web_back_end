#!/usr/bin/env python3
""" This script lists all documents in a NoSQL database. """


def schools_by_topic(mongo_collection, topic):
    """ Returns the list of school having a specific topic. """
    return mongo_collection.find({"topics": topic})
