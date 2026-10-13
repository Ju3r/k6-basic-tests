# k6-basic-tests
Repository contains several simple k6 (Load Testing) script examples. Each script demonstrates different features of k6 for HTTP load testing.

## How to run
1. Install k6: follow the official install guide.
2. Set the `BASE_URL` environment variable, e.g., `export BASE_URL=https://your-api.example.com`.
3. Run a script. For example: `k6 run scripts/soak.test.js`.