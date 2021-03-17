# reservation-manager

## Purpose

Tool to book reservations for guests and set capacity for reservations.

## Build

### Prerequisites

Please ensure that you have a working installation of Docker. Locate the
relevant instructions for your Operating System at
[the official Docker website](https://docs.docker.com/install).

## Running

### Steps

**NOTE:** This will both build and run the required services.

Please navigate to the root directory of this project.

In a terminal session, please run:

```
docker-compose -f docker-compose-dev.yml up --build --detach
```

### Logs

Any execution logs going to `stdout` will be accessible via:
```
docker-compose -f docker-compose-dev.yml logs --follow
```

### Access

In a recent Chromium-based browser (Google Chrome or Microsoft Edge),
please navigate to:

```
http://localhost:1234
```

The main operations will be available from that interface.
