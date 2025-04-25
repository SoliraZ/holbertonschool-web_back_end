#!/usr/bin/env python3
"""async routine that returns a list of all the delays."""
import asyncio
import random
from typing import List


async def wait_random(max_delay: int = 10) -> float:
    """Wait for a random delay between 0 and max_delay seconds."""
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Return a list of all the delays."""
    tasks = []
    for _ in range(n):
        tasks.append(wait_random(max_delay))
    return await asyncio.gather(*tasks)
