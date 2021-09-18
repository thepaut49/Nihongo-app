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
grep -RiIl 'HOST_NAME' | xargs sed -i "s/HOST_NAME/$host_name/g"
grep -RiIl 'FRONT_PORT' | xargs sed -i "s/FRONT_PORT/$front_port/g"

#cd user
#ls
#grep -RiIl 'HOST_NAME' | xargs sed -i "s/HOST_NAME/$host_name/g"
#grep -RiIl 'FRONT_PORT' | xargs sed -i "s/FRONT_PORT/$front_port/g"

cd "$BACK_DIR/src/main/resources"
sed -i "s/DB_NAME/$db_name/g" application.properties
sed -i "s/DB_USERNAME/$db_username/g" application.properties
sed -i "s/DB_PASSWORD/$db_password/g" application.properties
sed -i "s/HOST_NAME/$host_name/g" application.properties
sed -i "s/BACK_PORT/$back_port/g" application.properties
sed -i "s/SECRET/$secret/g" application.properties

# Modify file in front-end
cd "$FRONT_DIR/src/api"
sed -i "s/HOST_NAME/$host_name/g" apiConstants.js
sed -i "s/BACK_PORT/$back_port/g" apiConstants.js

cd "$FRONT_DIR"
sed -i "s/HOST_NAME/$host_name/g" webpack.config.dev.js
sed -i "s/BACK_PORT/$back_port/g" webpack.config.dev.js

sed -i "s/HOST_NAME/$host_name/g" webpack.config.prod.js
sed -i "s/BACK_PORT/$back_port/g" webpack.config.prod.js

# Modify docker-compose.yml file
cd "$BASE_DIR"
sed -i "s/DB_NAME/$db_name/g" docker-compose.yml
sed -i "s/DB_USERNAME/$db_username/g" docker-compose.yml
sed -i "s/DB_PASSWORD/$db_password/g" docker-compose.yml
sed -i "s/HOST_NAME/$host_name/g" docker-compose.yml
sed -i "s/BACK_PORT/$back_port/g" docker-compose.yml
sed -i "s/FRONT_PORT/$front_port/g" docker-compose.yml
