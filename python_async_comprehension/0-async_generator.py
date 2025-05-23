#!/usr/bin/env python3
"""Async generator example."""
import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """An async generator that yields a random number every second."""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
