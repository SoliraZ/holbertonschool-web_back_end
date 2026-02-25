#!/usr/bin/env python3
"""Helpers for hashing user passwords securely."""

import bcrypt


def hash_password(password: str) -> bytes:
    """Return a salted, hashed password for the given plain-text `password`."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())


def is_valid(hashed_password: bytes, password: str) -> bool:
    """Validate that `password` matches `hashed_password`."""
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password)
