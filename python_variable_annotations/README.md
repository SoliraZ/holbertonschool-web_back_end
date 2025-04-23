# Python Variable Annotations 🐍📚

This directory contains a series of Python scripts that demonstrate the use of type annotations in Python. Each script focuses on a specific concept or functionality, showcasing how type annotations can improve code readability and maintainability. 🚀

## Table of Contents 📖

1. **Basic Annotations**
   - `0-add.py`: Write a type-annotated function `add` that takes two floats `a` and `b` as arguments and returns their sum as a float. ➕
   - `1-concat.py`: Write a type-annotated function `concat` that takes two strings `str1` and `str2` as arguments and returns their concatenated string. 🔗
   - `2-floor.py`: Write a type-annotated function `floor` that takes a float `n` as an argument and returns the floor of the float. 📉
   - `3-to_str.py`: Write a type-annotated function `to_str` that takes a float `n` as an argument and returns its string representation. 📝

2. **Variable Annotations**
   - `4-define_variables.py`: Define and annotate variables with specific values, including integers, floats, booleans, and strings. 🛠️

3. **Complex Types**
   - `5-sum_list.py`: Write a type-annotated function `sum_list` that takes a list of floats and returns their sum as a float. 📋
   - `6-sum_mixed_list.py`: Write a type-annotated function `sum_mixed_list` that takes a list of integers and floats and returns their sum as a float. 🔢
   - `7-to_kv.py`: Write a type-annotated function `to_kv` that takes a string and an int/float, returning a tuple with the string and the square of the int/float. 🎯
   - `8-make_multiplier.py`: Write a type-annotated function `make_multiplier` that takes a float multiplier and returns a function that multiplies a float by the multiplier. ✖️

4. **Duck Typing**
   - `9-element_length.py`: Annotate a function that takes an iterable of sequences and returns a list of tuples containing each sequence and its length. 🦆

## How to Run 🏃‍♂️

Each script can be executed independently. For example, to test the `add` function in `0-add.py`, you can use the following commands:

```bash
bob@dylan:~$ cat 0-main.py
#!/usr/bin/env python3
add = __import__('0-add').add

print(add(1.11, 2.22) == 1.11 + 2.22)
print(add.__annotations__)

bob@dylan:~$ ./0-main.py
True
{'a':  <class 'float'>, 'b': <class 'float'>, 'return': <class 'float'>}
```

## Repository 📂

- **GitHub repository**: [holbertonschool-web_back_end](https://github.com/holbertonschool-web_back_end)
- **Directory**: `python_variable_annotations`

