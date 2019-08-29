const api_url = 'https://survey-manager-be.herokuapp.com/';

async function getUserName() {
   return fetch(api_url.concat('auth/userdetails/'), {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer  '.concat(localStorage.getItem('access'))
        })
    }
    );
}

async function postDataToEndpoint(relative_url, auth_required,  post_data) {
    const _data = JSON.stringify(post_data);
    if (auth_required) {
        return fetch(api_url.concat('register/'), {
            method: 'POST',
            body: _data,
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  '.concat(localStorage.getItem('access'))
            })
        }
        );
    } else {
        return fetch(api_url.concat('register/'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: _data
        }
        );
    }
}

export { getUserName, postDataToEndpoint, api_url };
