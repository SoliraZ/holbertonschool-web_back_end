#!/usr/bin/env python3
"""Redis basic exercise."""

from functools import wraps
from typing import Callable, Optional, Union
from uuid import uuid4

import redis


def count_calls(method: Callable) -> Callable:
    """Count how many times a Cache method is called."""

    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """Increment the call count and execute the method."""
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)

    return wrapper


def call_history(method: Callable) -> Callable:
    """Store the history of inputs and outputs for a Cache method."""

    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """Append inputs and outputs to Redis lists."""
        self._redis.rpush(f"{method.__qualname__}:inputs", str(args))
        output = method(self, *args, **kwargs)
        self._redis.rpush(f"{method.__qualname__}:outputs", output)
        return output

    return wrapper


class Cache:
    """Cache data in Redis."""

    def __init__(self) -> None:
        """Initialize the Redis client and clear the database."""
        self._redis = redis.Redis()
        self._redis.flushdb()

    @call_history
    @count_calls
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
