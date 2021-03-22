import OAuthManager from 'react-native-oauth';

const managerConfig = {
  github: {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  },
};

const manager = new OAuthManager('Devopolis');

manager.configure(managerConfig);

export default manager;
