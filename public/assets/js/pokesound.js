function getSound(pokemonId) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        const access_token = response.data.attributes.token;
        fetch(`https://api.pkmnapi.com/v1/pokemon/cries/${pokemonId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    xhr.open('POST', 'https://api.pkmnapi.com/v1/access_tokens', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        data: {
            type: 'access_tokens',
            attributes: {
                email_address: 'zano@live.cl'
            }
        }
    }));
}

export { getSound };
