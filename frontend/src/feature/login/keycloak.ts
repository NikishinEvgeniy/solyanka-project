import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://keycloak:9090',
    realm: 'solyanka',
    clientId: 'solyanka-frontend',
});

export default keycloak;