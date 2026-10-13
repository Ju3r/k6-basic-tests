# k6-basic-tests
Repository contains several simple k6 (Load Testing) script examples. Each script demonstrates different features of k6 for HTTP load testing.

## Test Purpose
The k6 scripts in this repository are designed to test the performance and reliability of a web application under load. They help evaluate:
- Application behavior as the number of virtual users (VUs) increases.
- Performance boundaries (latency and error rates).
- Correct handling of various HTTP status codes (200, 404).

## What Is Being Loaded
Each script sends HTTP requests to a base URL (`BASE_URL`) defined in `../data/data`. The endpoints being loaded are:
1. **GET /get** – a simple GET request.
2. **POST /post** – a POST request.
3. **GET /status/404** – checking the server's 404 response handling.
4. **GET /delay/1** – a request to an endpoint with a 1‑second delay, simulating a busy server.

## Possible Conclusions
- **Performance**: The `http_req_duration` thresholds (p(95)…) show how fast the server responds under different load levels.
- **Reliability**: The `http_req_failed` limits define an acceptable error rate; exceeding them indicates scaling issues.
- **Status Code Handling**: Verifies that the server correctly returns 404 for missing resources.
- **Load Trend**: Ramp‑up/ram‑down pattern mimics peak traffic and reveals how latency changes as user count grows and then decreases.

## How to run
1. Install k6: follow the official install guide.
2. Set the `BASE_URL` environment variable, e.g., `export BASE_URL=https://your-api.example.com`.
3. Run a script. For example: `k6 run scripts/soak.test.js`.