-- =========================
-- TABELA: usuarios
-- =========================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('ong', 'adotante') NOT NULL,

    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(11),

    senha VARCHAR(255) NOT NULL,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABELA: animais
-- =========================
CREATE TABLE animais (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(100),
    
    data_nascimento DATE,

    descricao TEXT,

    porte ENUM('pequeno', 'medio', 'grande'),
    sexo ENUM('macho', 'femea'),

    status ENUM('disponivel', 'em_processo', 'adotado') DEFAULT 'disponivel',

    destaque BOOLEAN DEFAULT FALSE,

    ong_id INT NOT NULL,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ong_id) REFERENCES usuarios(id)
);

-- =========================
-- TABELA: imagens_animais
-- =========================
CREATE TABLE imagens_animais (
    id INT AUTO_INCREMENT PRIMARY KEY,

    animal_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,

    FOREIGN KEY (animal_id) REFERENCES animais(id)
);

-- =========================
-- TABELA: interesses (adoção)
-- =========================
CREATE TABLE interesses (
    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,
    animal_id INT NOT NULL,

    status ENUM('pendente', 'aprovado', 'recusado') DEFAULT 'pendente',

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (animal_id) REFERENCES animais(id)
);