#!/usr/bin/env python3
"""Redis basic exercise."""

from typing import Callable, Optional, Union
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

    def get(
        self,
        key: str,
        fn: Optional[Callable[[bytes], Union[str, bytes, int, float]]] = None
    ) -> Union[str, bytes, int, float, None]:
        """Retrieve data from Redis and optionally transform it."""
        value = self._redis.get(key)
        if value is None:
            return None
        if fn is not None:
            return fn(value)
        return value

    def get_str(self, key: str) -> Optional[str]:
        """Retrieve a UTF-8 decoded string value from Redis."""
        return self.get(key, fn=lambda value: value.decode("utf-8"))

    def get_int(self, key: str) -> Optional[int]:
        """Retrieve an integer value from Redis."""
        return self.get(key, fn=int)
