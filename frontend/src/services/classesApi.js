const API_URL = import.meta.env.VITE_CLASSES_API_URL;

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

export function getSchedule() {
  return request(`${API_URL}?action=schedule`);
}

export function getAccess(code) {
  return request(`${API_URL}?action=access&code=${encodeURIComponent(code)}`);
}

export function registerStudent(form) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'register', form }),
  });
}