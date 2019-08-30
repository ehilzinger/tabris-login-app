const api_url = 'https://survey-manager-be.herokuapp.com/';
const token_endpoint = 'auth/token/';
export const register_endpoint = 'register/';
const auth_header_prefix = 'Bearer  ';

export async function login(username, password) {
    const formData = new FormData();
    formData.set('username', username);
    formData.append('password', password);
    const response = await fetch(api_url.concat(token_endpoint), { method: 'POST', body: formData });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", JSON.parse(Base64.decode(data.access.split('.')[1])).username);
        return true;
    } else {
        return false;
    }
}

export async function postDataToEndpoint(relative_url, auth_required, post_data) {
    const _data = JSON.stringify(post_data);
    if (auth_required) {
        return fetch(api_url.concat(relative_url), {
            method: 'POST',
            body: _data,
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth_header_prefix.concat(localStorage.getItem('access'))
            })
        }
        );
    } else {
        return fetch(api_url.concat(relative_url), {
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