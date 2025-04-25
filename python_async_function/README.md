# Python Async Functions 🚀🐍

This directory contains Python scripts that demonstrate the use of asynchronous programming with coroutines. Each script focuses on a specific concept or functionality, showcasing how to handle asynchronous tasks effectively. 🌟

## Table of Contents 📖

1. **Basic Async Syntax**
   - `0-basic_async_syntax.py`: Write an asynchronous coroutine `wait_random` that takes an integer argument `max_delay` (default value: 10). It waits for a random delay between 0 and `max_delay` seconds and returns the delay. Uses the `random` module. 🎲

2. **Concurrent Coroutines**
   - `1-concurrent_coroutines.py`: Import `wait_random` and write an async routine `wait_n` that spawns `wait_random` `n` times with the specified `max_delay`. Returns a list of delays in ascending order without using `sort()`. 🔄

3. **Measure Runtime**
   - `2-measure_runtime.py`: Import `wait_n` and create a `measure_time` function that measures the total execution time for `wait_n(n, max_delay)` and returns `total_time / n`. Uses the `time` module. ⏱️

4. **Tasks**
   - `3-tasks.py`: Import `wait_random` and write a function `task_wait_random` that takes an integer `max_delay` and returns an `asyncio.Task`. 🛠️
   - `4-tasks.py`: Modify `wait_n` into a new function `task_wait_n` that uses `task_wait_random`. The functionality remains nearly identical. 🔧

## How to Run 🏃‍♂️

Each script can be executed independently. For example, to test the `wait_random` function in `0-basic_async_syntax.py`, you can use the following commands:

```bash
bob@dylan:~$ cat 0-main.py
#!/usr/bin/env python3

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random

print(asyncio.run(wait_random()))
print(asyncio.run(wait_random(5)))
print(asyncio.run(wait_random(15)))

bob@dylan:~$ ./0-main.py
9.034261504534394
1.6216525464615306
10.634589756751769
```

## Repository 📂

- **GitHub repository**: [holbertonschool-web_back_end](https://github.com/holbertonschool-web_back_end)
- **Directory**: `python_async_function`

Happy coding! 💻✨