# read config.json file
$config = Get-Content config.json | ConvertFrom-Json


# Modify file in back-end
$controllersJava = Get-ChildItem -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller #create list of files
foreach ($file in $controllersJava)
{
    If ($file.name -ne 'user') {
        ((Get-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file
        ((Get-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file -Raw) -replace $config.front_port,'FRONT_PORT') | Set-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file
    }
}

((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.db_name,'DB_NAME') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.db_username,'DB_USERNAME') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.db_password,'DB_PASSWORD') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'

# Modify file in front-end
((Get-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js'
((Get-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js'

# Modify docker-compose.yml file
((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.host_name,'HOST_NAME') | Set-Content -Path '..\docker-compose.yml'
((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.back_port,'BACK_PORT') | Set-Content -Path '..\docker-compose.yml'
((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.db_name,'DB_NAME') | Set-Content -Path '..\docker-compose.yml'
((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.db_username,'DB_USERNAME') | Set-Content -Path '..\docker-compose.yml'
((Get-Content -Path '..\docker-compose.yml' -Raw) -replace $config.db_password,'DB_PASSWORD') | Set-Content -Path '..\docker-compose.yml'
