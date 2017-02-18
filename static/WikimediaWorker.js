const WIKIMEDIA_STREAM_URL = 'https://stream.wikimedia.org/v2/stream/recentchange';
const eventSource = new EventSource(WIKIMEDIA_STREAM_URL);
eventSource.onmessage = (e) => {
  const data = JSON.parse(e.data);
  postMessage(data);
};
