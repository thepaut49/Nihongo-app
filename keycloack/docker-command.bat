docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin jboss/keycloak

http://localhost:8080/auth/realms/Nihongo/protocol/openid-connect/token

curl -X POST 'http://localhost:8080/auth/realms/Nihongo/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=springboot-microservice' \
 --data-urlencode 'client_secret=dd9de58b-9625-4b2d-ad7a-143cc36d1910' \
 --data-urlencode 'username=user1' \
 --data-urlencode 'password=user1'

 docker run -e KEYCLOAK_USER=<USERNAME> -e KEYCLOAK_PASSWORD=<PASSWORD> \
    -e KEYCLOAK_IMPORT=/tmp/example-realm.json -v /tmp/example-realm.json:/tmp/example-realm.json jboss/keycloak


    docker build -t test/keycloak .

    docker run -p 8080:8080 -v ~/download/realm-export.json:/tmp/realm-export.json -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e KEYCLOAK_IMPORT="/tmp/realm-export.json -Dkeycloak.profile.feature.upload_scripts=enabled" jboss/keycloak 