#!/usr/bin/env python3
"""Utilities for obfuscating sensitive personal data in log messages."""
import re


def filter_datum(fields, redaction, message, separator):
    """Obfuscate specified fields in a log message."""
    pattern = rf"({'|'.join(map(re.escape, fields))})=[^{separator}]*"
    return re.sub(pattern, lambda m: f"{m.group(1)}={redaction}", message)
