#!/usr/bin/env python3
""" A simple helper function for pagination. """


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple of size two containing
    a start index and an end index."""
    if page <= 0 or page_size <= 0:
        return (0, 0)
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
