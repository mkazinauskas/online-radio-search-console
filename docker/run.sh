echo 'Using configuration template:'
cat /usr/share/nginx/html/config.template.js
echo ''

cp /usr/share/nginx/html/config.template.js /usr/share/nginx/html/config.js

echo 'Configuration before updates:'
cat /usr/share/nginx/html/config.js
echo ''

echo "Replacing REACT_APP_API_URL to '$REACT_APP_API_URL'"
sed -i "s|{{API_URL}}|$REACT_APP_API_URL|g" /usr/share/nginx/html/config.js

echo "Replacing REACT_APP_KEYCLOAK_URL to '$REACT_APP_KEYCLOAK_URL'"
sed -i "s|{{KEYCLOAK_URL}}|$REACT_APP_KEYCLOAK_URL|g" /usr/share/nginx/html/config.js

echo 'Using folowing configuration:'
cat /usr/share/nginx/html/config.js
echo ''

nginx -g 'daemon off;'