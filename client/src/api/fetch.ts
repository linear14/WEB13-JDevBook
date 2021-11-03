
const getData = {
    getusername: () => {
        return fetch('/api/data').then(res => res.json());
    }
}

export default getData;