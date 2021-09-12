#!/bin/bash
# read config.json file
host_name=`readJson config.json host_name`;  
db_name=`readJson config.json db_name`;  
db_username=`readJson config.json db_username`;  
db_password=`readJson config.json db_password`; 
back_port=`readJson config.json back_port`;  
front_port=`readJson config.json front_port`;


printf "host_name = %s \n" $host_name
printf "db_name = %s \n" $db_name 
printf "db_username = %s \n" $db_username
printf "db_password = %s \n" $db_password
printf "back_port = %s \n" $back_port
printf "front_port = %s \n" $front_port


#DESC=`readJson package.json description` || exit 2;  
# $DESC is "A great project"
#$config = Get-Content config.json | ConvertFrom-Json


# Modify file in back-end
#$controllersJava = Get-ChildItem -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller #create list of files
#foreach ($file in $controllersJava)
# {
 #   If ($file.name -ne 'user') {
  #      ((Get-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file
   #     ((Get-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file -Raw) -replace $config.front_port,'FRONT_PORT') | Set-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file
    #}
#}

#((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.db_name,'DB_NAME') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
#((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.db_username,'DB_USERNAME') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
#((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.db_password,'DB_PASSWORD') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
#((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
#((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'

# Modify file in front-end
#((Get-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js'
#((Get-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js'
#((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js'
#((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js'
#((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js'
#((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js'

# Modify docker-compose.yml file
#((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\docker-compose.yml'
#((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\docker-compose.yml'
#((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.db_name,'DB_NAME') | Set-Content -Path '..\docker-compose.yml'
#((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.db_username,'DB_USERNAME') | Set-Content -Path '..\docker-compose.yml'
#((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.db_password,'DB_PASSWORD') | Set-Content -Path '..\docker-compose.yml'
