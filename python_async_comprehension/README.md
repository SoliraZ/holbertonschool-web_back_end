# Python Async Comprehension 🚀🐍

This directory contains Python scripts that demonstrate the use of asynchronous programming with comprehensions. Each script focuses on a specific concept or functionality, showcasing how to handle asynchronous tasks effectively. 🌟

## Table of Contents 📖

1. **Async Generator**
   - `0-async_generator.py`: Write a coroutine `async_generator` that loops 10 times, asynchronously waits 1 second, and yields a random number between 0 and 10. Uses the `random` module. 🎲

2. **Async Comprehension**
   - `1-async_comprehension.py`: Import `async_generator` and write a coroutine `async_comprehension` that collects 10 random numbers using an async comprehension over `async_generator`, then returns the numbers. 🔄

3. **Measure Runtime**
   - `2-measure_runtime.py`: Import `async_comprehension` and write a coroutine `measure_runtime` that executes `async_comprehension` four times in parallel using `asyncio.gather`. Measures and returns the total runtime. ⏱️

## How to Run 🏃‍♂️

Each script can be executed independently. For example, to test the `async_generator` function in `0-async_generator.py`, you can use the following commands:

```bash
bob@dylan:~$ cat 0-main.py
#!/usr/bin/env python3

import asyncio

async_generator = __import__('0-async_generator').async_generator

async def print_yielded_values():
    result = []
    async for i in async_generator():
        result.append(i)
    print(result)

asyncio.run(print_yielded_values())

bob@dylan:~$ ./0-main.py
[4.403136952967102, 6.9092712604587465, 6.293445466782645, 4.549663490048418, 4.1326571686139015, 9.99058525304903, 6.726734105473811, 9.84331704602206, 1.0067279479988345, 1.3783306401737838]
```

## Repository 📂

- **GitHub repository**: [holbertonschool-web_back_end](https://github.com/holbertonschool-web_back_end)
- **Directory**: `python_async_comprehension`
