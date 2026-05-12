// 1. Pegamos os elementos
const botao = document.getElementById('buscarBtn');
const input = document.getElementById('pokemonInput');
const container = document.querySelector('.container'); // Coloquei aqui fora para facilitar

// 2. Criamos a função
async function buscarPokemon() {
    const nomePokemon = input.value.toLowerCase();

    if (nomePokemon === "") {
        alert("Digite o nome de um Pokémon!");
        return;
    }

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado! Verifique a grafia.");
        }

        const dados = await resposta.json();

        // 3. Injetamos os dados básicos
        document.getElementById('pokemonName').innerText = dados.name;
        document.getElementById('pokemonImage').src = dados.sprites.front_default;
        
        const tipo = dados.types[0].type.name;
        document.getElementById('pokemonType').innerText = tipo;
        
        document.getElementById('weight').innerText = dados.weight / 10;
        document.getElementById('height').innerText = dados.height / 10;

        // 4. Atributos (Stats)
        const hp = dados.stats[0].base_stat;
        const atk = dados.stats[1].base_stat;
        const def = dados.stats[2].base_stat;

        document.getElementById('hp-bar').style.width = `${(hp / 255) * 100}%`;
        document.getElementById('atk-bar').style.width = `${(atk / 255) * 100}%`;
        document.getElementById('def-bar').style.width = `${(def / 255) * 100}%`;
        
        // 5. Lógica das Cores (TEM que ficar dentro do try porque usa a variável 'dados')
        const cores = {
            fire: '#ff4d4d',
            water: '#4d94ff',
            grass: '#4dff88',
            electric: '#ffde00',
            bug: '#a6b91a',
            ghost: '#735797',
            psychic: '#f95587',
            ice: '#96d9d6',
            rock: '#b6a136',
            ground: '#e2bf65'
        };

        const corSorteada = cores[tipo] || '#ffde00';

        container.style.borderColor = corSorteada;
        document.getElementById('pokemonType').style.backgroundColor = corSorteada;

    } catch (erro) {
        alert(erro.message);
    }
} 

// 4. Eventos
botao.addEventListener('click', buscarPokemon);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});