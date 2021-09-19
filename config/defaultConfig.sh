#!/bin/bash
# read config.json file
config_file=config.json
host_name=$(cat $config_file | jq '. | .host_name' | tr -d '"') ;
db_name=$(cat $config_file | jq '. | .db_name' | tr -d '"');
db_username=$(cat $config_file | jq '. | .db_username' | tr -d '"');
db_password=$(cat $config_file | jq '. | .db_password' | tr -d '"');
back_port=$(cat $config_file | jq '. | .back_port' | tr -d '"');
front_port=$(cat $config_file | jq '. | .front_port' | tr -d '"');
secret=$(cat $config_file | jq '. | .secret' | tr -d '"');

echo "host_name   = $host_name";
echo "db_name     = $db_name";
echo "db_username = $db_username";
echo "db_password = $db_password";
echo "back_port   = $back_port";
echo "front_port  = $front_port";
echo "secret  = $secret";

cd ..
BASE_DIR=`pwd`
cd config
CONFIG_DIR=`pwd`
cd ../front-end-nihongo-redux
FRONT_DIR=`pwd`
cd ../apiNihongo
BACK_DIR=`pwd`

echo "BASE_DIR   = $BASE_DIR";
echo "CONFIG_DIR = $CONFIG_DIR";
echo "FRONT_DIR  = $FRONT_DIR";
echo "BACK_DIR   = $BACK_DIR";


# Modify file in back-end
cd "$BACK_DIR/src/main/java/com/thepaut49/nihongo/controller"
ls
grep -RiIl '$host_name' | xargs sed -i "s/$host_name/HOST_NAME/g"
grep -RiIl '$front_port' | xargs sed -i "s/$front_port/FRONT_PORT/g"

#cd user
#ls
#grep -RiIl '$host_name' | xargs sed -i "s/$host_name/HOST_NAME/g"
#grep -RiIl '$front_port' | xargs sed -i "s/$front_port/FRONT_PORT/g"

cd "$BACK_DIR/src/main/resources"
sed -i "s/$db_name/DB_NAME/g" application.properties
sed -i "s/$db_username/DB_USERNAME/g" application.properties
sed -i "s/$db_password/DB_PASSWORD/g" application.properties
sed -i "s/$host_name/HOST_NAME/g" application.properties
sed -i "s/$back_port/BACK_PORT/g" application.properties
sed -i "s/$secret/SECRET/g" application.properties

# Modify file in front-end
cd "$FRONT_DIR/src/api"
sed -i "s/$host_name/HOST_NAME/g" apiConstants.js
sed -i "s/$back_port/BACK_PORT/g" apiConstants.js

cd "$FRONT_DIR"
sed -i "s/$host_name/HOST_NAME/g" webpack.config.dev.js
sed -i "s/$back_port/BACK_PORT/g" webpack.config.dev.js

sed -i "s/$host_name/HOST_NAME/g" webpack.config.prod.js
sed -i "s/$back_port/BACK_PORT/g" webpack.config.prod.js

# Modify docker-compose.yml file
cd "$BASE_DIR"
sed -i "s/$db_name/DB_NAME/g" docker-compose.yml
sed -i "s/$db_username/DB_USERNAME/g" docker-compose.yml
sed -i "s/$db_password/DB_PASSWORD/g" docker-compose.yml
sed -i "s/$host_name/HOST_NAME/g" docker-compose.yml
sed -i "s/$back_port/BACK_PORT/g" docker-compose.yml
sed -i "s/$front_port/FRONT_PORT/g" docker-compose.yml
