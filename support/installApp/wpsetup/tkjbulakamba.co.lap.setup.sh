#!/bin/bash
cd /home/tkjbulakamba.co.lap/public_html
wp core download --locale=id_ID --allow-root
wp core config --dbname=wp-tkjbulakamba --dbuser=linux --dbpass=linux --allow-root
wp core install --url=https://tkjbulakamba.co.lap --title="WP tkjbulakamba" --admin_user=admin --admin_password=adminwptkjbulakamba17 --admin_email=admin@tkjbulakamba.lap --allow-root
