-- CreateTable
CREATE TABLE `Proprietario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proprietario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valor` DECIMAL(12, 2) NOT NULL,
    `proprietario_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_proprietario_ID_fkey` FOREIGN KEY (`proprietario_ID`) REFERENCES `Proprietario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
