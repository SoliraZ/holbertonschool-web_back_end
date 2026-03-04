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
        if path is None:
            return True

        if not excluded_paths:
            return True

        # Ensure path is slash tolerant
        if not path.endswith('/'):
            path = f"{path}/"

        if path in excluded_paths:
            return False

        return True

    def authorization_header(self, request=None) -> str:
        """Get the authorization header from the request
        """
        if request is None:
            return None

        if 'Authorization' not in request.headers:
            return None

        return request.headers.get('Authorization')

    def current_user(self, request=None) -> User:
        """Get the current user from the request
        """
        return None
