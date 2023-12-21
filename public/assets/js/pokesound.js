function getSound(pokemonId) {
    fetch('https://api.pkmnapi.com/v1/access_tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                type: 'access_tokens',
                attributes: {
                    email_address: 'zano@live.cl'
                }
            }
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la obtención del token');
            }
            return response.json();
        })
        .then(data => {
            const access_token = data.data.attributes.token;
            return fetch(`https://api.pkmnapi.com/v1/pokemon/cries/${pokemonId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la obtención del sonido');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export { getSound };
