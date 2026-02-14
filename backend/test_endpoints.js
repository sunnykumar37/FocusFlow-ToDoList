const http = require('http');

const makeRequest = (method, path, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const runTests = async () => {
    try {
        console.log('--- Creating Tasks for Filtering Tests ---');
        await makeRequest('POST', '/tasks', { title: 'Work Task 1', category: 'Work', priority: 'High' });
        await makeRequest('POST', '/tasks', { title: 'Personal Task 1', category: 'Personal', priority: 'Low' });
        await makeRequest('POST', '/tasks', { title: 'Work Task 2', category: 'Work', priority: 'Medium' });

        console.log('\n--- Testing GET /tasks (All) ---');
        const getAll = await makeRequest('GET', '/tasks');
        console.log('Total Count:', getAll.body.length);

        console.log('\n--- Testing GET /tasks?category=Work ---');
        const getWork = await makeRequest('GET', '/tasks?category=Work');
        console.log('Work Count (Should be >= 2):', getWork.body.length);
        const workCheck = getWork.body.every(t => t.category === 'Work');
        console.log('All are Work category:', workCheck);

        console.log('\n--- Testing GET /tasks?priority=High ---');
        const getHigh = await makeRequest('GET', '/tasks?priority=High');
        console.log('High Priority Count (Should be >= 1):', getHigh.body.length);
        const highCheck = getHigh.body.every(t => t.priority === 'High');
        console.log('All are High priority:', highCheck);

    } catch (e) {
        console.error('Test failed:', e);
    }
};

// Wait for server to potentially restart/start
setTimeout(runTests, 3000);
