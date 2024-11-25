-- CreateTable
CREATE TABLE `Proprietarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proprietarios_email_key`(`email`),
    UNIQUE INDEX `Proprietarios_endereco_key`(`endereco`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `proprietario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
