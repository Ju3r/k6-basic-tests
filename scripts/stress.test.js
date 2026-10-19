import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';

export const options = {
    stages: [
        { duration: '30s', target: 30 },
        { duration: '30s', target: 60 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 60 },
        { duration: '30s', target: 30 },
        { duration: '30s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.1'],
    },
};

export default function () {
    const resStates = http.get(`${BASE_URL}/delay/1`);

    check(resStates, {
        'status 200': (r) => r.status === 200,
        'latency < 2000ms': (r) => r.timings.duration < 2000,
    });

    sleep(1.5);
}