#!/usr/bin/env python3
"""Helpers for hashing user passwords securely."""

import bcrypt


def hash_password(password: str) -> bytes:
    """Return a salted, hashed password for the given plain-text `password`."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
