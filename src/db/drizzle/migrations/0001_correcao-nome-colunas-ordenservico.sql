ALTER TABLE `historico_status_ordem_servico` RENAME COLUMN `orden_servico_id` TO `ordem_servico_id`;--> statement-breakpoint
ALTER TABLE `ordens_servico_itens` RENAME COLUMN `orden_servico_id` TO `ordem_servico_id`;--> statement-breakpoint
ALTER TABLE `tokens_acesso_publico` RENAME COLUMN `orden_servico_id` TO `ordem_servico_id`;--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` DROP FOREIGN KEY `fk_historico_status_ordem_servico_ordens_servico1`;
--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` DROP FOREIGN KEY `fk_historico_status_ordem_servico_usuarios1`;
--> statement-breakpoint
ALTER TABLE `ordens_servico` DROP FOREIGN KEY `fk_ordens_servico_cliente1`;
--> statement-breakpoint
ALTER TABLE `ordens_servico` DROP FOREIGN KEY `fk_ordens_servico_usuarios1`;
--> statement-breakpoint
ALTER TABLE `ordens_servico` DROP FOREIGN KEY `fk_ordens_servico_veiculos1`;
--> statement-breakpoint
ALTER TABLE `ordens_servico_itens` DROP FOREIGN KEY `fk_ordens_servico_itens_ordens_servico1`;
--> statement-breakpoint
ALTER TABLE `tokens_acesso_publico` DROP FOREIGN KEY `fk_tokens_acesso_publico_ordens_servico1`;
--> statement-breakpoint
ALTER TABLE `veiculos` DROP FOREIGN KEY `fk_veiculos_cliente`;
--> statement-breakpoint
DROP INDEX `fk_historico_status_ordem_servico_ordens_servico1_idx` ON `historico_status_ordem_servico`;--> statement-breakpoint
DROP INDEX `fk_ordens_servico_itens_ordens_servico1_idx` ON `ordens_servico_itens`;--> statement-breakpoint
DROP INDEX `fk_tokens_acesso_publico_ordens_servico1_idx` ON `tokens_acesso_publico`;--> statement-breakpoint
ALTER TABLE `clientes` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `clientes` MODIFY COLUMN `atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` MODIFY COLUMN `status_anterior` enum('EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO');--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` MODIFY COLUMN `novo_status` enum('EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO') NOT NULL;--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `ordens_servico` MODIFY COLUMN `status` enum('EM_ELABORACAO','AGUARDANDO_APROVACAO','APROVADO','EM_EXECUCAO','FINALIZADO','ENTREGUE','REPROVADO','ENCERRADO') NOT NULL;--> statement-breakpoint
ALTER TABLE `ordens_servico` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `ordens_servico` MODIFY COLUMN `atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `ordens_servico_itens` MODIFY COLUMN `tipo` enum('PECA','SERVICO','MAO_DE_OBRA') NOT NULL;--> statement-breakpoint
ALTER TABLE `ordens_servico_itens` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `tokens_acesso_publico` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `usuarios` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `usuarios` MODIFY COLUMN `atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `veiculos` MODIFY COLUMN `criado_em` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `veiculos` MODIFY COLUMN `atualizado_em` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` ADD CONSTRAINT `historico_status_ordem_servico_ordem_servico_id_ordens_servico_id_fk` FOREIGN KEY (`ordem_servico_id`) REFERENCES `ordens_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `historico_status_ordem_servico` ADD CONSTRAINT `historico_status_ordem_servico_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico` ADD CONSTRAINT `ordens_servico_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico` ADD CONSTRAINT `ordens_servico_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico` ADD CONSTRAINT `ordens_servico_veiculo_id_veiculos_id_fk` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ordens_servico_itens` ADD CONSTRAINT `ordens_servico_itens_ordem_servico_id_ordens_servico_id_fk` FOREIGN KEY (`ordem_servico_id`) REFERENCES `ordens_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tokens_acesso_publico` ADD CONSTRAINT `tokens_acesso_publico_ordem_servico_id_ordens_servico_id_fk` FOREIGN KEY (`ordem_servico_id`) REFERENCES `ordens_servico`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `veiculos` ADD CONSTRAINT `veiculos_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `fk_historico_status_ordem_servico_ordens_servico1_idx` ON `historico_status_ordem_servico` (`ordem_servico_id`);--> statement-breakpoint
CREATE INDEX `fk_ordens_servico_itens_ordens_servico1_idx` ON `ordens_servico_itens` (`ordem_servico_id`);--> statement-breakpoint
CREATE INDEX `fk_tokens_acesso_publico_ordens_servico1_idx` ON `tokens_acesso_publico` (`ordem_servico_id`);