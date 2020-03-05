const xhr = new XMLHttpRequest();
const apiCall = (method, url, data, callback) => {
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      let response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(data);
};
