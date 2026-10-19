import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5m', target: 10 },
        { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const resStates = http.post(`${BASE_URL}/post`);

    check(resStates, {
        'status 200': (r) => r.status === 200,
        'latency < 1000ms': (r) => r.timings.duration < 1000,
    });

    sleep(1.5);
}