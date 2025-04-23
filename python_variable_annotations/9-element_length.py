#!/usr/bin/env python3
""" Annotate the funciton parameter and return value with the correct types."""
from typing import List, Tuple, Iterable, Sequence


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """Return a list of tuples with the length of each element in the list."""
    return [(i, len(i)) for i in lst]
