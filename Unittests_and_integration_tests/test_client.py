#!/usr/bin/env python3
"""Unit tests for client.py."""

import unittest
from unittest.mock import patch

try:
    from parameterized import parameterized
except ImportError:
    import re
    from functools import wraps

    def _sanitize(s: str) -> str:
        return re.sub(r"[^0-9a-zA-Z]+", "_", s).strip("_")

    class _ExpandedMethod:
        def __init__(self, func, cases):
            self._func = func
            self._cases = list(cases)

        def __set_name__(self, owner, name):
            func = self._func
            for idx, raw_case in enumerate(self._cases):
                case = raw_case if isinstance(raw_case, tuple) else (raw_case,)
                suffix = (
                    _sanitize(case[0])
                    if case and isinstance(case[0], str)
                    else ""
                )
                method_name = f"{name}_{idx}"
                if suffix:
                    method_name = f"{method_name}_{suffix}"

                @wraps(func)
                def _method(self, _case=case, _func=func):
                    return _func(self, *_case)

                setattr(owner, method_name, _method)

            def _placeholder(*_args, **_kwargs):
                raise AttributeError(
                    f"{name} was expanded; run {name}_<n> instead"
                )

            setattr(owner, name, _placeholder)

    class parameterized:
        @staticmethod
        def expand(cases):
            def _decorator(func):
                return _ExpandedMethod(func, cases)

            return _decorator

from client import GithubOrgClient


class TestGithubOrgClient(unittest.TestCase):
    """Test cases for GithubOrgClient."""

    def _assert_org(self, org_name, mock_get_json):
        expected = {"login": org_name}
        mock_get_json.return_value = expected

        client = GithubOrgClient(org_name)
        self.assertEqual(client.org, expected)

        mock_get_json.assert_called_once_with(
            "https://api.github.com/orgs/{}".format(org_name)
        )

    @parameterized.expand([
        ("google",),
        ("abc",),
    ])
    @patch("client.get_json")
    def test_org(self, org_name, mock_get_json):
        """Assert org returns payload and calls get_json once."""
        self._assert_org(org_name, mock_get_json)

    @patch("client.get_json")
    def test_org_0(self, mock_get_json):
        self._assert_org("google", mock_get_json)

    @patch("client.get_json")
    def test_org_1(self, mock_get_json):
        self._assert_org("abc", mock_get_json)
