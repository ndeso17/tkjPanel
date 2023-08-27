#!/bin/bash
cd rootDirectory
wp core download --locale=bahasa --allow-root
wp core config --dbname=nama_database --dbuser=nama_pengguna --dbpass=kata_sandi --allow-root
wp core install --url=urlDomain --title="namaSitus" --admin_user=usernameWp --admin_password=passwordWp --admin_email=emailAdminWp --allow-root
