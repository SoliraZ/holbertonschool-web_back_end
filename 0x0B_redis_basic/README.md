# 0x0B. Redis basic

This project introduces basic Redis usage in Python with a small `Cache` class.
It covers storing values, converting returned data, counting method calls, saving
call history, and replaying previous calls.

## Learning Objectives

- Connect to Redis from Python with `redis-py`
- Store and retrieve values (`str`, `bytes`, `int`, `float`)
- Use decorators to add behavior to class methods
- Track method call counts with Redis `INCR`
- Save method inputs/outputs with Redis `RPUSH`
- Reconstruct call history using `LRANGE` and `zip`

## Files

- `exercise.py`: main implementation (`Cache`, decorators, `replay`)

## Implemented Features

- `Cache.__init__`
  - Creates a Redis client and flushes the database at startup.

- `Cache.store(data) -> str`
  - Stores a value under a random UUID key and returns the key.
  - Decorated with:
    - `@count_calls`: increments `Cache.store` counter each call
    - `@call_history`: stores args in `Cache.store:inputs` and return values in
      `Cache.store:outputs`

- `Cache.get(key, fn=None)`
  - Gets raw value from Redis.
  - If `fn` is provided, applies conversion (`fn(value)`).

- `Cache.get_str(key) -> Optional[str]`
  - Returns decoded UTF-8 string.

- `Cache.get_int(key) -> Optional[int]`
  - Returns integer conversion.

- `replay(method) -> None`
  - Prints number of calls and the full input/output history for the given
    method.

## Redis Commands Used

- `SET`, `GET`
- `INCR`
- `RPUSH`
- `LRANGE`
- `FLUSHDB`

## Quick Example

```python
#!/usr/bin/env python3
from exercise import Cache, replay

cache = Cache()
cache.store("foo")
cache.store("bar")
cache.store(42)

replay(cache.store)
```

Expected output format:

```text
Cache.store was called 3 times:
Cache.store(*('foo',)) -> <uuid>
Cache.store(*('bar',)) -> <uuid>
Cache.store(*(42,)) -> <uuid>
```

## Requirements

- Python 3.7+
- Redis server running locally
- `redis` Python package

Install dependency:

```bash
pip3 install redis
```