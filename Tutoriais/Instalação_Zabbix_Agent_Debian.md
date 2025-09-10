# 🚀 Tutorial de Instalação e Configuração do Zabbix Agent2 no Debian

## 🔑 Passo 1: Acessar o servidor
Conecte-se ao servidor via SSH utilizando seu usuário administrador.

```bash
sudo su -
```

## 📦 Passo 2: Instalar o Zabbix Agent2

```bash
apt install zabbix-agent2
```
Durante a instalação, o serviço será registrado e habilitado automaticamente.

## ⚙️ Passo 3: Configuração do Zabbix Agent2

Acesse a pasta de configuração 

```bash
cd /etc/zabbix/
```

Lista o que tem dentro da pasta
```bash
ls
```

Exibe o nome do Host
```bash
hostname
```

Substitua "NOME DO HOST" no comando abaixo pelo nome do host que aparece após o comando anterior. 
```bash
cd /etc/zabbix/
 
mv zabbix_agent2.conf zabbix_agent2.conf.original
echo "##### Zabbix Agent #####" >> /etc/zabbix/zabbix_agent2.conf
cat zabbix_agent2.conf.original | grep -Ev '^#|^$' >> zabbix_agent2.conf
sed -i 's/127.0.0.1/172.31.248.244/g' /etc/zabbix/zabbix_agent2.conf
sed -i 's/Zabbix server/NOME DO HOST/g' /etc/zabbix/zabbix_agent2.conf
echo "Timeout=15" >> /etc/zabbix/zabbix_agent2.conf
echo "DebugLevel=3" >> /etc/zabbix/zabbix_agent2.conf
 
systemctl enable zabbix-agent2
systemctl restart zabbix-agent2
systemctl status zabbix-agent2.service
```

## 📜 Passo 4: Validar Logs

Verifique se o agente iniciou corretamente e está se comunicando com o servidor Zabbix:

```bash
tail -f /var/log/zabbix/zabbix_agent2.log
```

Caso o FireWall esteja atrapalhando o agente, siga para os seguintes passo. Caso contrário, terminamos por aqui.

## 🔥 Passo 5: Configurar Firewall

Verifica o status do Firewall
```bash
 systemctl status firewalld.service
```

Lista todas as configurações do firewall ativas, incluindo zonas, serviços e regras.
```bash
 firewall-cmd --list-all
```

Lista todas as portas
```bash
firewall-cmd --list-ports
```

Se o **firewalld** estiver não tiver nenhuma porta, libere a porta **10050/tcp**:

```bash
firewall-cmd --permanent --add-port=10050/tcp
```

Recarrega as regras do firewall para aplicar as alterações feitas.
```bash
firewall-cmd --reload
```

Lista todas as portas novamente para confirmar a nova porta
```bash
firewall-cmd --list-ports
```

## ✅ Passo 6: Ativar e Reiniciar o Serviço

```bash
systemctl restart zabbix-agent2
```

Verifica o status do Serviço
```bash
systemctl status zabbix-agent2.service
```

## 📜 Passo 7: Validar Logs

Ainda na pasta :/etc/zabbix, Verifique se o agente iniciou corretamente e está se comunicando com o servidor Zabbix:

```bash
tail -f /var/log/zabbix/zabbix_agent2.log
```
