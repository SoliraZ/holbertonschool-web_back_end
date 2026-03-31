#!/usr/bin/env python3
"""Redis basic exercise."""

from typing import Union
from uuid import uuid4

import redis


class Cache:
    """Cache data in Redis."""

    def __init__(self) -> None:
        """Initialize the Redis client and clear the database."""
        self._redis = redis.Redis()
        self._redis.flushdb()

    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store data in Redis using a random key."""
        key = str(uuid4())
        self._redis.set(key, data)
        return key
