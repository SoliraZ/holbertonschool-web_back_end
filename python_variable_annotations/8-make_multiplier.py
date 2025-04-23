#!/usr/bin/env python3
"""Function that take a float multiplier and return a function
that multiplies a float by multiplier."""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a function that multiplies a float by multiplier."""
    def multiply(n: float) -> float:
        """Return the product of n and multiplier."""
        return n * multiplier
    return multiply
