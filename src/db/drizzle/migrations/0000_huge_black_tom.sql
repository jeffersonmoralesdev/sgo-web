-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `clientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`cpf` varchar(11) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`email` varchar(255) NOT NULL,
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`atualizado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clientes_id` PRIMARY KEY(`id`),
	CONSTRAINT `cpf_UNIQUE` UNIQUE(`cpf`),
	CONSTRAINT `email_UNIQUE` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `historico_status_ordem_servico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status_anterior` enum('EM_ELABORAÇÃO','AGUARDANDO_APROVAÇÃO','APROVADO','EM_EXECUÇÃO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO'),
	`novo_status` enum('EM_ELABORAÇÃO','AGUARDANDO_APROVAÇÃO','APROVADO','EM_EXECUÇÃO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO') NOT NULL,
	`observacao` text,
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`orden_servico_id` int NOT NULL,
	`usuario_id` int NOT NULL,
	CONSTRAINT `historico_status_ordem_servico_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ordens_servico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('EM_ELABORAÇÃO','AGUARDANDO_APROVAÇÃO','APROVADO','EM_EXECUÇÃO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO') NOT NULL,
	`descricao_problema` text NOT NULL,
	`observacao` text,
	`valor_total` decimal(10,2) NOT NULL DEFAULT '0.00',
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`atualizado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`usuario_id` int NOT NULL,
	`cliente_id` int NOT NULL,
	`veiculo_id` int NOT NULL,
	CONSTRAINT `ordens_servico_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ordens_servico_itens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tipo` enum('SERVIÇOS PRESTADO','PEÇAS') NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`quantidade` decimal(10,3) NOT NULL,
	`valor_unitario` decimal(10,2) NOT NULL,
	`valor_total` decimal(10,2) NOT NULL,
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`orden_servico_id` int NOT NULL,
	CONSTRAINT `ordens_servico_itens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tokens_acesso_publico` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(255) NOT NULL,
	`usado_em` timestamp,
	`expira_em` timestamp NOT NULL,
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`orden_servico_id` int NOT NULL,
	CONSTRAINT `tokens_acesso_publico_id` PRIMARY KEY(`id`),
	CONSTRAINT `token_UNIQUE` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha_hash` varchar(255) NOT NULL,
	`perfil` enum('ADMIN','OPERADOR') NOT NULL,
	`ativo` tinyint NOT NULL DEFAULT 1,
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`atualizado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_UNIQUE` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `veiculos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`placa` varchar(7) NOT NULL,
	`marca` varchar(50) NOT NULL,
	`modelo` varchar(50) NOT NULL,
	`ano` varchar(9) NOT NULL,
	`cor` varchar(50),
	`quilometragem` int NOT NULL,
	`criado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`atualizado_em` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`cliente_id` int NOT NULL,
	CONSTRAINT `veiculos_id` PRIMARY KEY(`id`),
	CONSTRAINT `placa_UNIQUE` UNIQUE(`placa`)
);
--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` ADD CONSTRAINT `fk_historico_status_ordem_servico_ordens_servico1` FOREIGN KEY (`orden_servico_id`) REFERENCES `ordens_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` ADD CONSTRAINT `fk_historico_status_ordem_servico_usuarios1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico` ADD CONSTRAINT `fk_ordens_servico_cliente1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico` ADD CONSTRAINT `fk_ordens_servico_usuarios1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico` ADD CONSTRAINT `fk_ordens_servico_veiculos1` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico_itens` ADD CONSTRAINT `fk_ordens_servico_itens_ordens_servico1` FOREIGN KEY (`orden_servico_id`) REFERENCES `ordens_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tokens_acesso_publico` ADD CONSTRAINT `fk_tokens_acesso_publico_ordens_servico1` FOREIGN KEY (`orden_servico_id`) REFERENCES `ordens_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `veiculos` ADD CONSTRAINT `fk_veiculos_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `fk_historico_status_ordem_servico_ordens_servico1_idx` ON `historico_status_ordem_servico` (`orden_servico_id`);--> statement-breakpoint
CREATE INDEX `fk_historico_status_ordem_servico_usuarios1_idx` ON `historico_status_ordem_servico` (`usuario_id`);--> statement-breakpoint
CREATE INDEX `fk_ordens_servico_usuarios1_idx` ON `ordens_servico` (`usuario_id`);--> statement-breakpoint
CREATE INDEX `fk_ordens_servico_cliente1_idx` ON `ordens_servico` (`cliente_id`);--> statement-breakpoint
CREATE INDEX `fk_ordens_servico_veiculos1_idx` ON `ordens_servico` (`veiculo_id`);--> statement-breakpoint
CREATE INDEX `fk_ordens_servico_itens_ordens_servico1_idx` ON `ordens_servico_itens` (`orden_servico_id`);--> statement-breakpoint
CREATE INDEX `fk_tokens_acesso_publico_ordens_servico1_idx` ON `tokens_acesso_publico` (`orden_servico_id`);--> statement-breakpoint
CREATE INDEX `fk_veiculos_cliente_idx` ON `veiculos` (`cliente_id`);
*/