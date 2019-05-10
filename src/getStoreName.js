const getStoreName = () => window.location.pathname.split('/').slice(-1)[0];

export default getStoreName;
