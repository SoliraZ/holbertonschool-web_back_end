#!/usr/bin/env python3
"""Utilities for obfuscating personal data in log messages."""

import logging
import os
import re
from typing import List

import mysql.connector


PII_FIELDS = ("name", "email", "phone", "ssn", "password")


def filter_datum(fields: List[str], redaction: str,
                 message: str, separator: str) -> str:
    """Return `message` with values of `fields` replaced by `redaction`."""
    pattern = rf"({'|'.join(map(re.escape, fields))})=[^{separator}]*"
    return re.sub(pattern, lambda m: f"{m.group(1)}={redaction}", message)


class RedactingFormatter(logging.Formatter):
    """Redacting Formatter class."""

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        """Format the record and redact configured sensitive fields."""
        return filter_datum(self.fields, self.REDACTION,
                            super().format(record), self.SEPARATOR)


def get_logger() -> logging.Logger:
    """Return a configured logger for user data."""
    logger = logging.getLogger("user_data")
    logger.setLevel(logging.INFO)
    logger.propagate = False
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(RedactingFormatter(list(PII_FIELDS)))
        logger.addHandler(handler)
    return logger


def get_db() -> mysql.connector.connection.MySQLConnection:
    """Return a MySQL database connection using environment credentials."""
    username = os.getenv("PERSONAL_DATA_DB_USERNAME", "root")
    password = os.getenv("PERSONAL_DATA_DB_PASSWORD", "")
    host = os.getenv("PERSONAL_DATA_DB_HOST", "localhost")
    database = os.getenv("PERSONAL_DATA_DB_NAME")
    return mysql.connector.connect(
        user=username,
        password=password,
        host=host,
        database=database,
    )


def main() -> None:
    """Obtain a DB connection and display all users with redacted PII."""
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "SELECT name, email, phone, ssn, password, ip, last_login, user_agent "
        "FROM users;"
    )
    logger = get_logger()
    for name, email, phone, ssn, password, ip, last_login, user_agent in cursor:
        message = (
            f"name={name}; email={email}; phone={phone}; ssn={ssn}; "
            f"password={password}; ip={ip}; "
            f"last_login={last_login.isoformat()}; user_agent={user_agent};"
        )
        logger.info(message)
    cursor.close()
    db.close()


if __name__ == "__main__":
    main()
