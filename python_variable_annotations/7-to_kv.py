#!/usr/bin/env python3
"""take a string and an int or float as arguments and return a tuple."""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple with the string and the square of the int or float."""
    return (k, v * v)
