#!/usr/bin/env/python3
"""LIFO caching"""

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """LIFO cache system using last-in, first-out eviction."""

    def __init__(self):
        """Initialize the LIFO cache."""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """Add an item to the cache with LIFO eviction."""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            if key in self.order:
                self.order.remove(key)
            self.order.append(key)
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last_key = self.order.pop()
            del self.cache_data[last_key]
            print("DISCARD: {}".format(last_key))

        self.cache_data[key] = item
        self.order.append(key)

    def get(self, key):
        """Get an item by key."""
        if key is None:
            return None
        return self.cache_data.get(key)
