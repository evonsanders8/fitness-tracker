export async function fetchAPI(url, method="GET", sendData=null) {
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAzLCJ1c2VybmFtZSI6ImV2b25zYW5kZXJzIiwiaWF0IjoxNjA2MTgyNzM2LCJleHAiOjE2MDY3ODc1MzZ9.ZRFmbahrnLeJhfc8s-OtsAve2r41MlkReZyJcLtvUCo'
      }
    };
  
    if (sendData) {
      fetchOptions.body = JSON.stringify(sendData);
    }
  
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
  
    return data;
  }

 