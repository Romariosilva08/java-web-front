# Usar a imagem oficial do Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos HTML, CSS e JS para o diretório do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para acesso ao frontend
EXPOSE 80

# Comando para rodar o Nginx (servidor web)
CMD ["nginx", "-g", "daemon off;"]
