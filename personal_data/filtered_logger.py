#!/usr/bin/env python3
"""Utilities for obfuscating personal data in log messages."""
import re
from typing import List


def filter_datum(fields: List[str], redaction: str,
                 message: str, separator: str) -> str:
    """Return `message` with values of `fields` replaced by `redaction`."""
    pattern = rf"({'|'.join(map(re.escape, fields))})=[^{separator}]*"
    return re.sub(pattern, lambda m: f"{m.group(1)}={redaction}", message)
