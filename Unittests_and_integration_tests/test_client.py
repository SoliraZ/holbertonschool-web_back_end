#!/usr/bin/env python3
"""Unit tests for client.py."""

import unittest
from unittest.mock import patch

from parameterized import parameterized

from client import GithubOrgClient


class TestGithubOrgClient(unittest.TestCase):
    """Test cases for GithubOrgClient."""

    @parameterized.expand(
        [
            ("google",),
            ("abc",),
        ],
        name_func=lambda func, num, params: f"{func.__name__}_{num}",
    )
    @patch("client.get_json")
    def test_org(self, org_name, mock_get_json):
        """Assert org returns payload and calls get_json once."""
        expected = {"login": org_name}
        mock_get_json.return_value = expected

        client = GithubOrgClient(org_name)
        self.assertEqual(client.org, expected)

        mock_get_json.assert_called_once_with(
            "https://api.github.com/orgs/{}".format(org_name)
        )
