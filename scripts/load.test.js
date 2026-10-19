import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';

export const options = {
    stages: [
        { duration: '15s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '15s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<800'],
        http_req_failed: ['rate<0.03'],
    },
};

export default function () {
    const resStates = http.get(`${BASE_URL}/get`);

    check(resStates, {
        'status 200': (r) => r.status === 200,
        'latency < 800ms': (r) => r.timings.duration < 800,
    });

    sleep(1.5);
}