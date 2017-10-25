class ServiceLayer { 

  static resource(name) {
      const serviceLayerUrl = 'https://saphana.htri.net:50000/b1s/v1/';
      return serviceLayerUrl + name;
  }

  static json(fetchPromise) {
    return fetchPromise.then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.log('error getting json from response:', response);
        throw response.statusText;
      }
    });
  }

  static get(name) {
    var url = this.resource(name);
    return this.json(fetch(url, { 
          credentials: 'include' 
    }));
  }

  static patch(name, payload) {
    console.log('patch', name, payload);
    var url = this.resource(name);
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  }

  static post(name, payload) {
    console.log('post', name, payload);
    var url = this.resource(name);
    return this.json(fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload),
    }));
  }

  static del(name, payload) {
    console.log('delete', name, payload);
    var url = this.resource(name);
    return fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  static login(credentials) {
    return this.post('Login', credentials);
  }

  static isLoggedIn() {
    var url = this.resource('');
    return fetch(url, { 
          credentials: 'include' 
    });
  }
 
  static logout() {
    var url = this.resource('Logout');
    return fetch(url, {
      method: 'POST',
      credentials: 'include'
    });
  }
}
export default ServiceLayer;
