## Personal Data – Logging & Security Utilities

Small collection of scripts and helpers for working with **sensitive user data** in a safe way.  
This project comes from Holberton tasks about **PII redaction**, **secure logging**, and **password hashing**.

---

### Features

- **Log redaction**
  - `filter_datum` to obfuscate sensitive fields in log messages
  - `RedactingFormatter` (custom `logging.Formatter`) that automatically hides PII in logs

- **Secure database access**
  - `get_db` reads credentials from environment variables:
    - `PERSONAL_DATA_DB_USERNAME` (default: `root`)
    - `PERSONAL_DATA_DB_PASSWORD` (default: empty)
    - `PERSONAL_DATA_DB_HOST` (default: `localhost`)
    - `PERSONAL_DATA_DB_NAME` (no default – required)

- **Password security**
  - `hash_password` uses `bcrypt` + salt to hash passwords
  - `is_valid` checks a clear-text password against a stored hash

---

### Modules Overview

- **`filtered_logger.py`**
  - `PII_FIELDS`: tuple of PII field names (`name`, `email`, `phone`, `ssn`, `password`)
  - `filter_datum(fields, redaction, message, separator)`
  - `RedactingFormatter`
  - `get_logger()`
  - `get_db()`
  - `main()` – reads `users` from DB and logs each row with redacted PII

- **`encrypt_password.py`**
  - `hash_password(password: str) -> bytes`
  - `is_valid(hashed_password: bytes, password: str) -> bool`

---

### Requirements

- Python 3.8+ recommended
- Packages:
  - `mysql-connector-python`
  - `bcrypt`

Install in a virtualenv, for example:

```bash
python3 -m venv venv
source venv/bin/activate
pip install mysql-connector-python bcrypt
```

---

### Environment Variables

Set these before running database-related scripts:

```bash
export PERSONAL_DATA_DB_USERNAME="root"
export PERSONAL_DATA_DB_PASSWORD=""
export PERSONAL_DATA_DB_HOST="localhost"
export PERSONAL_DATA_DB_NAME="my_db"
```

---

### Example Usage

Run the logging script (from the `personal_data` directory):

```bash
PERSONAL_DATA_DB_USERNAME=root \
PERSONAL_DATA_DB_PASSWORD="" \
PERSONAL_DATA_DB_HOST=localhost \
PERSONAL_DATA_DB_NAME=my_db \
python3 filtered_logger.py
```

Use the password helpers:

```bash
python3 -i encrypt_password.py
>>> from encrypt_password import hash_password, is_valid
>>> h = hash_password("MyAmazingPassw0rd")
>>> is_valid(h, "MyAmazingPassw0rd")
True
```

---

### Important Notes

- Never log **raw** PII (name, email, phone, SSN, password, etc.).
- Never store passwords in **plain text** – always hash with a strong algorithm such as `bcrypt`.
- Keep database credentials **out of code**; use environment variables or a proper secrets manager.
