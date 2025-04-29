#!/usr/bin/env python3
""" A simple helper function and Server class for pagination. """


from typing import Tuple, List, Dict
import math
import csv


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple of size two containing
    a start index and an end index."""
    if page <= 0 or page_size <= 0:
        return (0, 0)
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialize the server with the database file."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Load the dataset if not already loaded."""
        if self.__dataset is None:
            with open(self.DATA_FILE, 'r') as f:
                reader = csv.reader(f)
                self.__dataset = list(reader)[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Get a page of the dataset."""
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()
        if start_index >= len(dataset):
            return []
        return dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Get a page of the dataset with hypermedia pagination."""
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()
        if start_index >= len(dataset):
            return {
                'page_size': 0,
                'page': page,
                'data': [],
                'next_page': None,
                'prev_page': None,
                'total_pages': 0
            }
        data = dataset[start_index:end_index]
        total_pages = math.ceil(len(dataset) / page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None
        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }
