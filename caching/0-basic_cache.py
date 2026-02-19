#!/usr/bin/python3
""" Basic Caching"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ Basic Cache class """
    def put(self, key, item):
        """Assign an item to the cache under the given key."""
        if key is not None and item is not None:
            self.cache_data[key] = item
    def get(self, key):
        """Retrieve an item from the cache by key."""
        if key is not None:
            return self.cache_data.get(key)
        return None
