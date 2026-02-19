#!/usr/bin/env/python3
"""MRU caching"""

BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """MRU cache system using most-recently-used eviction."""

    def __init__(self):
        """Initialize the MRU cache."""
        super().__init__()
        self.order = []

    def _touch(self, key):
        """Mark key as most recently used."""
        if key in self.order:
            self.order.remove(key)
        self.order.append(key)

    def put(self, key, item):
        """Add an item to the cache with MRU eviction."""
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.cache_data[key] = item
            self._touch(key)
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            mru_key = self.order.pop()
            del self.cache_data[mru_key]
            print("DISCARD: {}".format(mru_key))

        self.cache_data[key] = item
        self._touch(key)

    def get(self, key):
        """Get an item by key and mark it as recently used."""
        if key is None or key not in self.cache_data:
            return None

        self._touch(key)
        return self.cache_data.get(key)
