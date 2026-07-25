# API Documentation

## Base URL

```
http://localhost:3001/api
```

## Endpoints

### Players

#### Get all players
```
GET /players
```

Response:
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "pdga_number": "12345",
    "member_since": "2023-01-01T00:00:00Z"
  }
]
```

#### Get player by ID
```
GET /players/:id
```

#### Create player
```
POST /players
```

Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "pdga_number": "12345"
}
```

### Bag Tags

#### Get all bag tags
```
GET /bag-tags
```

#### Get bag tags by season
```
GET /bag-tags?season=2023
```

#### Get player bag tag
```
GET /bag-tags/player/:player_id
```

### Tournaments

#### Get all tournaments
```
GET /tournaments
```

#### Create tournament
```
POST /tournaments
```

Body:
```json
{
  "name": "Spring Tournament",
  "tournament_date": "2023-06-15",
  "location": "Moss Course",
  "format": "stroke"
}
```

### Leaderboard

#### Get current leaderboard
```
GET /leaderboard?season=2023
```

Response:
```json
[
  {
    "rank": 1,
    "player_name": "John Doe",
    "wins": 5,
    "points": 150,
    "win_percentage": 71.4
  }
]
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "status": 400
}
```
