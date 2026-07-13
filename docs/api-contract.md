# API contract (V1)

Base URL local: `http://localhost:8000`

## `GET /api/health`

```json
{ "status": "ok", "service": "DataHealth Profiler API", "version": "1.0.0" }
```

## `GET /api/demos`

Returns demo catalog entries: `id`, `name`, `description`, `filename`, `rows`, `columns`.

## `POST /api/profile`

`multipart/form-data` with field `file` (`.csv`).

## `POST /api/profile/demo/{demo_id}`

Profiles a seed file. Known ids: `titanic`, `ecommerce`, `payroll`.

## `ProfileReport`

- `summary`: rows, columns, completeness, duplicates, score, status, headline
- `columns[]`: type, nulls, uniques, samples, stats, histogram, flags
- `flags[]`: code, column, severity, message, detail
- `preview[]`: first rows
- `methodology[]`: short explanations

## Error payload

HTTP 4xx/5xx with:

```json
{
  "detail": {
    "error": "human message",
    "code": "INVALID_FILE|FILE_TOO_LARGE|PARSE_ERROR|TOO_MANY_ROWS|EMPTY_DATASET|DEMO_NOT_FOUND|INTERNAL_ERROR",
    "detail": "optional detail"
  }
}
```
