const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 443;

// 미들웨어 설정
app.use(bodyParser.json());

// 데이터 저장을 위한 임시 배열 (실제 데이터베이스를 사용할 경우 이 부분 대체)
let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' }
];

// [GET] 모든 데이터 조회
app.get('/api/items', (req, res) => {
    res.json(items);
});

// [GET] 특정 ID의 데이터 조회
app.get('/api/items/:id', (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json(item);
});

// [POST] 새로운 데이터 생성
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send('Name and description are required');
    }
    const newItem = {
        id: items.length + 1,
        name,
        description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// [PUT] 특정 ID의 데이터 업데이트
app.put('/api/items/:id', (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    const { name, description } = req.body;
    if (name) item.name = name;
    if (description) item.description = description;

    res.json(item);
});

// [DELETE] 특정 ID의 데이터 삭제
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
