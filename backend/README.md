# VoiceOwl Backend (Node.js + TypeScript)

The project implements:
- POST `/api/transcription` — mock-download + mock-transcription + save to MongoDB
- POST `/api/azure-transcription` — stubbed Azure transcription integration + save to MongoDB
- GET `/api/transcriptions` — returns transcriptions created in the last 30 days
- Basic retry logic for downloads
- Jest tests with MongoMemoryServer

*** What index you would add for this query if the dataset had 100M+ records.
--- A single-field index on createdAt turns this into an efficient range query using index scans.


*** Describe how you’d evolve your service to handle 10k+ concurrent requests.
---- The synchronous STT pipeline doesn’t scale well, so I would decouple it using a queue (like SQS, RabbitMQ, or Kafka).
Background workers process audio files asynchronously.
The service would be containerized and run as multiple replicas behind a load balancer.
MongoDB would use connection pooling and eventually sharding or read replicas.

*** How you’d improve it for production
---- Move from in-process mock transcription to async queue
Add structured logging
Implement distributed tracing
Add rate limiting
Move audio download to cloud storage (S3/GCS)
Add unit + integration test coverage
Use environment-based config management

*** Assumptions:
- Audio URLs are publicly accessible and valid.
- Transcription is mocked as allowed by the assignment.
- Azure SDK integration may use stub data if no credentials exist.
- The MongoDB schema is intentionally simple.
- Only last 30 days filtering is required for GET /transcriptions.
- Retry logic is sufficient for transient download errors.
- No authentication, rate-limiting, or authorization is required.
- Tests run on in-memory MongoDB rather than a real instance.
- No pagination or advanced query filters are required.
- The service is synchronous for this assignment; queues are discussed only for scalability.