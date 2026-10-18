import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';

const EXPECTED_404 = http.expectedStatuses(404);

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<800'],
        http_req_failed: ['rate<0.075'],
    },
};

export default function () {
    const resStates = http.get(`${BASE_URL}/status/404`, {
        responseCallback: EXPECTED_404,
    });

    check(resStates, {
        'status 404': (r) => r.status === 404,
        'latency < 800ms': (r) => r.timings.duration < 800,
    });

    sleep(1.5);
}