# Pagination Project 📚✨

This directory contains Python scripts that demonstrate various pagination techniques, including simple pagination, hypermedia pagination, and deletion-resilient pagination. Each script focuses on a specific concept or functionality, showcasing how to handle large datasets effectively. 🚀

## Table of Contents 📖

1. **Simple Helper Function**
   - `0-simple_helper_function.py`: Write a function `index_range` that takes two integers `page` and `page_size` and returns a tuple of start and end indexes for pagination. 🔢

2. **Simple Pagination**
   - `1-simple_pagination.py`: Implement a `Server` class with a `get_page` method that paginates a dataset of popular baby names. Uses `index_range` for pagination logic. 🍼

3. **Hypermedia Pagination**
   - `2-hypermedia_pagination.py`: Extend the `Server` class with a `get_hyper` method that returns pagination metadata, including `page_size`, `page`, `data`, `next_page`, `prev_page`, and `total_pages`. 🌐

4. **Deletion-Resilient Pagination**
   - `3-hypermedia_del_pagination.py`: Implement a `get_hyper_index` method in the `Server` class to handle pagination when rows are deleted from the dataset. Ensures no data is skipped. 🗑️

## How to Run 🏃‍♂️

Each script can be executed independently. For example, to test the `index_range` function in `0-simple_helper_function.py`, you can use the following commands:

```bash
bob@dylan:~$ cat 0-main.py
#!/usr/bin/env python3

index_range = __import__('0-simple_helper_function').index_range

res = index_range(1, 7)
print(type(res))
print(res)

res = index_range(page=3, page_size=15)
print(type(res))
print(res)

bob@dylan:~$ ./0-main.py
<class 'tuple'>
(0, 7)
<class 'tuple'>
(30, 45)
```

## Repository 📂

- **GitHub repository**: [holbertonschool-web_back_end](https://github.com/holbertonschool-web_back_end)
- **Directory**: `pagination`
