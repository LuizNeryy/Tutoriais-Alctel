# Tutorial de Instalação e Configuração do Zabbix Agent2 no Debian

## Passo 1: Acessar o servidor
Conecte-se ao servidor via SSH utilizando seu usuário administrador.

```bash
ssh admin@portal10.contactfy.cloud
sudo su -
```

---

## Passo 2: Instalar o Zabbix Agent2

```bash
apt install zabbix-agent2
```

Durante a instalação, o serviço será registrado e habilitado automaticamente.

---

## Passo 3: Configuração do Zabbix Agent2

Acesse a pasta de configuração e edite o arquivo do agente:

```bash
cd /etc/zabbix/

mv zabbix_agent2.conf zabbix_agent2.conf.original
echo "##### Zabbix Agent #####" >> /etc/zabbix/zabbix_agent2.conf
cat zabbix_agent2.conf.original | grep -Ev '^#|^$' >> zabbix_agent2.conf
sed -i 's/127.0.0.1/172.31.248.244/g' /etc/zabbix/zabbix_agent2.conf
sed -i 's/Zabbix server/portal1/g' /etc/zabbix/zabbix_agent2.conf
echo "Timeout=15" >> /etc/zabbix/zabbix_agent2.conf
echo "DebugLevel=3" >> /etc/zabbix/zabbix_agent2.conf
```

---

## Passo 4: Configurar Firewall

Se o **firewalld** estiver ativo, libere a porta **10050/tcp**:

```bash
firewall-cmd --permanent --add-port=10050/tcp
firewall-cmd --reload
firewall-cmd --list-ports
```

---

## Passo 5: Ativar e Reiniciar o Serviço

```bash
systemctl enable zabbix-agent2
systemctl restart zabbix-agent2
systemctl status zabbix-agent2.service
```

---

## Passo 6: Validar Logs

Verifique se o agente iniciou corretamente e está se comunicando com o servidor Zabbix:

```bash
tail -f /var/log/zabbix/zabbix_agent2.log
```

Se aparecer a mensagem **`host not found`**, confirme se o host foi cadastrado corretamente no Zabbix Server com o mesmo nome configurado no `zabbix_agent2.conf`.
