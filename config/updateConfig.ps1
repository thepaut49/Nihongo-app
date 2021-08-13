# read config.json file
$config = Get-Content config.json | ConvertFrom-Json


# Modify file in back-end
$controllersJava = Get-ChildItem -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller #create list of files
foreach ($file in $controllersJava)
{
    ((Get-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file -Raw) -replace 'HOST_NAME',$config.host_name) | Set-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file
    ((Get-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file -Raw) -replace 'FRONT_PORT',$config.front_port) | Set-Content -Path ..\apiNihongo\src\main\java\com\thepaut49\nihongo\controller\$file
}

((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace 'DB_NAME',$config.db_name) | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace 'DB_USERNAME',$config.db_username) | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace 'DB_PASSWORD',$config.db_password) | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace 'HOST_NAME',$config.host_name) | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'
((Get-Content -Path '..\apiNihongo\src\main\resources\application.properties' -Raw) -replace 'BACK_PORT',$config.back_port) | Set-Content -Path '..\apiNihongo\src\main\resources\application.properties'


D:\Users\Antoine\Docker\Nihongo-app\apiNihongo\src\main\resources\application.properties

# Modify file in front-end
((Get-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js' -Raw) -replace 'HOST_NAME',$config.host_name) | Set-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js'
((Get-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js' -Raw) -replace 'BACK_PORT',$config.back_port) | Set-Content -Path '..\front-end-nihongo-redux\src\api\apiConstants.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js' -Raw) -replace 'HOST_NAME',$config.host_name) | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js' -Raw) -replace 'BACK_PORT',$config.back_port) | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.dev.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js' -Raw) -replace 'HOST_NAME',$config.host_name) | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js'
((Get-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js' -Raw) -replace 'BACK_PORT',$config.back_port) | Set-Content -Path '..\front-end-nihongo-redux\webpack.config.prod.js'
