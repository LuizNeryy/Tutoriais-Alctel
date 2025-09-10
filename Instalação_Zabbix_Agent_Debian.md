#!/bin/bash
#
# -----------------------------------------------------------------------------
#            TUTORIAL DE INSTALAÇÃO E CONFIGURAÇÃO DO ZABBIX AGENT 2
# -----------------------------------------------------------------------------
#
# OBJETIVO:
# Este script serve como um guia documentado para instalar e configurar o
# Zabbix Agent 2 em um sistema Debian.
#
# INSTRUÇÕES:
# NÃO EXECUTE ESTE SCRIPT DIRETAMENTE.
# Ele contém comandos administrativos e de configuração. Leia os comentários
# e copie e cole os blocos de comando em seu terminal para executar cada etapa.
#
# -----------------------------------------------------------------------------

echo "### INÍCIO DO TUTORIAL - ZABBIX AGENT 2 ###"

# --- ETAPA 1: PREPARAÇÃO DO AMBIENTE ---
# Para instalar pacotes e editar arquivos de sistema, é necessário ter
# privilégios de superusuário (root).
#
# Copie o comando abaixo:
# -----------------------------------------------------------------------------
sudo su -


# --- ETAPA 2: INSTALAÇÃO DO ZABBIX AGENT 2 ---
# Utilize o gerenciador de pacotes 'apt' para instalar o agente.
#
# Copie o comando abaixo:
# -----------------------------------------------------------------------------
apt install zabbix-agent2


# --- ETAPA 3: CONFIGURAÇÃO DO AGENTE ---
# O bloco de comandos a seguir irá:
#   1. Navegar para o diretório de configuração.
#   2. Fazer um backup do arquivo de configuração original.
#   3. Criar um novo arquivo de configuração limpo, sem comentários.
#   4. Apontar o agente para o IP do seu servidor Zabbix.
#   5. Definir o Hostname que o servidor Zabbix espera.
#   6. Ajustar parâmetros de Timeout e Debug.
#   7. Habilitar, reiniciar e verificar o status do serviço.
#
# ATENÇÃO: No comando 'sed' abaixo, altere '172.31.248.244' para o IP
# do seu Zabbix Server e 'portal1' para o hostname exato do seu host
# conforme cadastrado no Zabbix.
#
# Copie o bloco inteiro de uma vez e cole no seu terminal:
# -----------------------------------------------------------------------------
cd /etc/zabbix/

mv zabbix_agent2.conf zabbix_agent2.conf.original

echo "##### Zabbix Agent #####" >> /etc/zabbix/zabbix_agent2.conf

cat zabbix_agent2.conf.original | grep -Ev '^#|^$' >> zabbix_agent2.conf

sed -i 's/127.0.0.1/172.31.248.244/g' /etc/zabbix/zabbix_agent2.conf

sed -i 's/Zabbix server/portal1/g' /etc/zabbix/zabbix_agent2.conf

echo "Timeout=15" >> /etc/zabbix/zabbix_agent2.conf

echo "DebugLevel=3" >> /etc/zabbix/zabbix_agent2.conf

systemctl enable zabbix-agent2

systemctl restart zabbix-agent2

systemctl status zabbix-agent2.service


# --- ETAPA 4: VERIFICAÇÃO E DIAGNÓSTICO (LOGS) ---
# O passo mais importante após configurar é verificar os logs em tempo real
# para identificar erros de comunicação.
#
# Copie o comando abaixo e observe a saída. Pressione Ctrl+C para sair.
# -----------------------------------------------------------------------------
tail -f /var/log/zabbix/zabbix_agent2.log


# --- ETAPA 5: CONFIGURAÇÃO DO FIREWALL ---
# Se os logs mostrarem erros de conexão, é provável que um firewall esteja
# bloqueando a porta 10050. Os comandos abaixo verificam o status do
# firewalld e abrem a porta necessária.
#
# Copie os comandos um por um ou em bloco:
# -----------------------------------------------------------------------------
systemctl status firewalld.service

firewall-cmd --permanent --add-port=10050/tcp

firewall-cmd --reload

firewall-cmd --list-ports


# --- ETAPA 6: REINICIALIZAÇÃO FINAL E VERIFICAÇÃO ---
# Após alterar o firewall, reinicie o agente e verifique os logs novamente
# para confirmar que a comunicação foi estabelecida com sucesso.
#
# Copie os comandos abaixo:
# -----------------------------------------------------------------------------
systemctl restart zabbix-agent2.service

systemctl status zabbix-agent2.service

tail -f /var/log/zabbix/zabbix_agent2.log


# --- FIM DO TUTORIAL ---
echo "### Tutorial finalizado. Verifique os logs para confirmar o sucesso. ###"
