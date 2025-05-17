// URL base da API
//const baseURL = 'http://localhost:8080';

// const baseURL = 'http://localhost:3000';


// export default function getDados(endpoint) {
//     return fetch(`${baseURL}${endpoint}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Erro ao acessar o endpoint ${endpoint}: ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .catch(error => {
//             console.error('Erro ao acessar o endpoint:', error);
//             throw error; // Re-throw error to propagate it further in the chain
//         });
// }


const baseURL = ''; // vazio para buscar relativo ao site

export default function getDados(endpoint) {
  return fetch(`/api/${endpoint}.json`)
    .then(res => {
      if (!res.ok) throw new Error('Erro ao buscar dados');
      return res.json();
    });
}
