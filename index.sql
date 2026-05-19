CREATE TABLE `tokens_acesso_publico` (
`id` int NOT NULL AUTO_INCREMENT,
`token` varchar(255) NOT NULL,
`usado_em` timestamp NULL DEFAULT NULL,
`expira_em` timestamp NOT NULL,
`criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`ordem_servico_id` int NOT NULL,
PRIMARY KEY (`id`),


UNIQUE KEY `token_UNIQUE` (`token`),


KEY `fk_tokens_acesso_publico_ordens_servico1_idx` (`ordem_servico_id`),

CONSTRAINT `fk_tokens_acesso_publico_ordens_servico1` 
FOREIGN KEY (`ordem_servico_id`) REFERENCES `ordens_servico` (`id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'



'CREATE TABLE `historico_status_ordem_servico` (
      `id` int NOT NULL AUTO_INCREMENT,
      `status_anterior` enum('EM_ELABORACAO\',\'AGUARDANDO_APROVACAO\',\'APROVADO\',\'EM_EXECUCAO\',\'FINALIZADO\',\'ENTREGUE\',\'REPROVADO\',\'ENCERRADO\') DEFAULT NULL,\n  `novo_status` enum(\'PECA\',\'SERVICO\',\'MAO_DE_OBRA\') NOT NULL,\n  `observacao` text,\n  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  `ordem_servico_id` int NOT NULL,\n  `usuario_id` int NOT NULL,\n  PRIMARY KEY (`id`),\n  KEY `fk_historico_status_ordem_servico_ordens_servico1_idx` (`ordem_servico_id`),\n  KEY `fk_historico_status_ordem_servico_usuarios1_idx` (`usuario_id`),\n  CONSTRAINT `fk_historico_status_ordem_servico_ordens_servico1` FOREIGN KEY (`ordem_servico_id`) REFERENCES `ordens_servico` (`id`),\n  CONSTRAINT `fk_historico_status_ordem_servico_usuarios1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'

