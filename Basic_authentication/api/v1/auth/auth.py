#!/usr/bin/env python3
"""Auth module
"""
from typing import List, TypeVar

from flask import request


User = TypeVar('User')


class Auth:
    """Template class for all authentication systems
    """

    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """Define which routes don't need authentication
        """
        return False

    def authorization_header(self, request=None) -> str:
        """Get the authorization header from the request
        """
        return None

    def current_user(self, request=None) -> User:
        """Get the current user from the request
        """
        return None
