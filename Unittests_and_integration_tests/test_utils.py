#!/usr/bin/env python3
"""Unit tests for utils.py."""

import unittest
from unittest.mock import Mock, patch
from parameterized import parameterized

from utils import access_nested_map, get_json


class TestAccessNestedMap(unittest.TestCase):
    """Test cases for access_nested_map."""

    @parameterized.expand([
        ({"a": 1}, ("a",), 1),
        ({"a": {"b": 2}}, ("a",), {"b": 2}),
        ({"a": {"b": 2}}, ("a", "b"), 2),
    ])
    def test_access_nested_map(self, nested_map, path, expected):
        """Assert access_nested_map returns the expected value."""
        self.assertEqual(access_nested_map(nested_map, path), expected)

    @parameterized.expand([
        ({}, ("a",), "a"),
        ({"a": 1}, ("a", "b"), "b"),
    ])
    def test_access_nested_map_exception(
        self, nested_map, path, expected_exception_message
    ):
        """Assert KeyError is raised with the expected message."""
        with self.assertRaises(KeyError) as context:
            access_nested_map(nested_map, path)

        self.assertEqual(
            str(context.exception), f"'{expected_exception_message}'"
        )


class TestGetJson(unittest.TestCase):
    """Test cases for get_json."""

    @parameterized.expand([
        ("http://example.com", {"payload": True}),
        ("http://holberton.io", {"payload": False}),
    ])
    def test_get_json(self, test_url, test_payload):
        """Assert get_json returns expected payload from URL."""
        with patch("utils.requests.get") as mock_get:
            mock_response = Mock()
            mock_response.json.return_value = test_payload
            mock_get.return_value = mock_response

            self.assertEqual(get_json(test_url), test_payload)
            mock_get.assert_called_once_with(test_url)
