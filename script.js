/**
 * script.js
 * Implementação de várias classes em orientação a objetos (POO):
 * - Restaurante
 * - Prato
 * - Artista
 * - Musica
 *
 * Para cada classe/método complexo há comentários em português e perguntas
 * no formato exigido (por exemplo: "// Copilot, me explique...").
 */

// -----------------------------
// Classe Restaurante
// -----------------------------
// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, o que é 'this' neste contexto?
// Explicação IA: O 'constructor' é um método especial que inicializa uma
// instância quando usamos 'new'. Ele configura as propriedades iniciais do
// objeto (por exemplo, nome e endereço). 'this' refere-se à instância atual
// criada — ou seja, o objeto que contém essas propriedades.
class Restaurante {
	// O construtor inicializa o nome, endereço e um cardápio vazio (lista de pratos)
	constructor(nome, endereco) {
		this.nome = nome; // nome do restaurante
		this.endereco = endereco; // endereço do restaurante
		this.cardapio = []; // array para armazenar instâncias de Prato
	}

	// Método que retorna uma mensagem de apresentação do restaurante
	apresentar() {
		return `Bem-vindo ao restaurante ${this.nome}, localizado em ${this.endereco}.`;
	}

	// Copilot, por que este método 'adicionarPrato' é útil?
	// Explicação IA: O método 'adicionarPrato' centraliza a lógica de como um prato
	// deve ser armazenado no cardápio. Ele permite validação e encapsula a
	// operação para evitar que outras partes do código manipulem diretamente o array.
	// Adiciona um prato ao cardápio. Aceita tanto instâncias de Prato quanto objetos simples.
	adicionarPrato(prato) {
		// 'this' refere-se à instância atual de Restaurante
		if (prato instanceof Prato) {
			this.cardapio.push(prato);
		} else if (prato && typeof prato === 'object') {
			// permitir adicionar um objeto literal semelhante a um Prato
			this.cardapio.push(new Prato(prato.nome, prato.preco, prato.ingredientes));
		} else {
			throw new TypeError('Prato inválido. Deve ser uma instância de Prato ou um objeto.');
		}
	}

	// Retorna uma lista formatada (strings) com as descrições dos pratos do cardápio
	listarPratos() {
		return this.cardapio.map((p) => p.descricao());
	}
}


// -----------------------------
// Classe Prato
// -----------------------------
// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, o que é 'this' neste contexto?
// Explicação IA: A classe 'Prato' representa um item do cardápio. O constructor
// inicializa nome, preço e ingredientes. 'this' refere-se à instância do prato
// específico (cada prato tem suas próprias propriedades).
class Prato {
	// nome: string, preco: number, ingredientes: array de strings
	constructor(nome, preco = 0, ingredientes = []) {
		this.nome = nome;
		this.preco = Number(preco);
		this.ingredientes = Array.isArray(ingredientes) ? ingredientes : [];
	}

	// Copilot, por que este método 'descricao' é útil?
	// Explicação IA: O método 'descricao' converte os dados do prato em uma string
	// legível, pronta para exibição em interfaces ou logs. Assim encapsulamos
	// a formatação do prato dentro da própria classe.
	// Retorna uma descrição do prato (útil para exibir em UI ou logs)
	descricao() {
		const ingr = this.ingredientes.length ? `Ingredientes: ${this.ingredientes.join(', ')}` : 'Ingredientes não informados';
		return `${this.nome} - R$ ${this.preco.toFixed(2)}. ${ingr}`;
	}
}


// -----------------------------
// Classe Artista
// -----------------------------
// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, o que é 'this' neste contexto?
// Explicação IA: A classe 'Artista' modela um músico ou banda. O constructor
// inicializa nome e gênero; 'this' refere-se à instância do artista. A lista de
// músicas ('musicas') pertence àquela instância específica.
class Artista {
	// nome: string, genero: string (opcional)
	constructor(nome, genero = '') {
		this.nome = nome;
		this.genero = genero;
		this.musicas = []; // lista de instâncias de Musica
	}

	// Copilot, por que este método 'adicionarMusica' é útil?
	// Explicação IA: 'adicionarMusica' organiza como músicas são associadas a um
	// artista. Mantém validação (aceitar instância de Musica ou objeto) e evita
	// manipulações diretas da propriedade 'musicas' por código externo.
	// Adiciona uma música ao repertório do artista. Aceita instância de Musica ou objeto literal.
	adicionarMusica(musica) {
		if (musica instanceof Musica) {
			this.musicas.push(musica);
		} else if (musica && typeof musica === 'object') {
			this.musicas.push(new Musica(musica.titulo, musica.duracao, this));
		} else {
			throw new TypeError('Música inválida. Deve ser uma instância de Musica ou um objeto.');
		}
	}

	// Retorna os títulos das músicas do artista
	listarMusicas() {
		return this.musicas.map((m) => m.titulo);
	}
}


// -----------------------------
// Classe Musica
// -----------------------------
// Copilot, me explique esta classe. O que é um 'constructor'?
// Copilot, o que é 'this' neste contexto?
// Explicação IA: A classe 'Musica' representa uma faixa musical. O constructor
// inicializa título, duração e referência ao artista. 'this' identifica a
// instância da música (cada música tem seu próprio título e duração).
class Musica {
	// titulo: string, duracao: em segundos (number), artista: instância de Artista ou string
	constructor(titulo, duracao = 0, artista = null) {
		this.titulo = titulo;
		this.duracao = Number(duracao); // em segundos
		this.artista = artista; // pode ser instância de Artista ou nome (string)
	}

	// Copilot, por que este método 'info' é útil?
	// Explicação IA: O método 'info' gera uma string formatada com as informações
	// principais da música (título, artista e duração). Isso é útil para exibir
	// em listas, player ou logs sem repetir lógica de formatação em vários lugares.
	// Retorna informação formatada sobre a música
	info() {
		const artistaNome = this.artista && this.artista.nome ? this.artista.nome : this.artista || 'Artista desconhecido';
		const minutos = Math.floor(this.duracao / 60);
		const segundos = this.duracao % 60;
		return `${this.titulo} — ${artistaNome} (${minutos}:${segundos.toString().padStart(2, '0')})`;
	}

	// Método de exemplo que simula tocar a música (aqui só loga no console)
	tocar() {
		console.log(`Tocando: ${this.info()}`);
	}
}


// Exemplos de uso (você pode descomentar para testar no navegador):
// const r = new Restaurante('Sabor & Cia', 'Rua das Flores, 123');
// const p1 = new Prato('Lasanha', 25.5, ['massa', 'queijo', 'molho']);
// r.adicionarPrato(p1);
// console.log(r.listarPratos());

// const artista = new Artista('Banda Exemplo', 'Rock');
// const musica = new Musica('Canção 1', 210, artista);
// artista.adicionarMusica(musica);
// console.log(artista.listarMusicas());
// musica.tocar();

