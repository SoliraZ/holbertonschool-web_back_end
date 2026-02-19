#!/usr/bin/env/python3
"""Fifo caching"""

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class"""
    def __init__(self):
        """Initialize the FIFO cache."""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """Add an item to the cache with FIFO eviction."""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            first_key = self.order.pop(0)
            del self.cache_data[first_key]
            print("DISCARD: {}".format(first_key))

        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """Get an item by key."""
        if key is None:
            return None
        return self.cache_data.get(key)
