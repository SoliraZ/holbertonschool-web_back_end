#!/usr/bin/env python3
""" return the floor of a number."""
from math import floor


def floor(n: float) -> int:
    """Return the floor of a number."""
    return int(n) if n > 0 else int(n) - 1
