# Queuing System in JS - Redis Setup

This task validates a local Redis workflow for the `queuing_system_in_js` project.

## Objective

- Compile Redis `6.0.10`
- Start a Redis server
- Verify Redis is reachable
- Store and read a value (`Holberton` -> `School`)
- Generate `dump.rdb`
- Stop the Redis server process

## Prerequisites

- Redis source already present in:
  - `queuing_system_in_js/redis-6.0.10`
- A Linux shell environment

## Steps

From `queuing_system_in_js/redis-6.0.10`:

```bash
make
src/redis-server --port 6380 --dir ../ --dbfilename dump.rdb
```

In another terminal:

```bash
src/redis-cli -p 6380 ping
src/redis-cli -p 6380 set Holberton School
src/redis-cli -p 6380 get Holberton
src/redis-cli -p 6380 SAVE
```

Expected outputs:

- `ping` -> `PONG`
- `set Holberton School` -> `OK`
- `get Holberton` -> `School`

## Stop Redis

Get Redis PID and kill it:

```bash
ps -eo pid,command | awk '/redis-server.*6380/ {print $1}'
kill <PID>
```

## Deliverable

The dump file must exist at project root:

- `queuing_system_in_js/dump.rdb`
