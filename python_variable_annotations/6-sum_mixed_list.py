#!/usr/bin/env python3
"""take a list of floats and int and return their sum as a float."""
from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """Return the sum of a list of floats and int."""
    return sum(mxd_lst)
