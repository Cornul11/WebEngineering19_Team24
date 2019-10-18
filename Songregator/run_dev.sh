#!/usr/bin

sudo apt update
sudo apt upgrade -y python3
sudo apt install -y build-essential libssl-dev libffi-dev python-dev python3-pip python3-venv
python3 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
npm install
npm run dev
python manage.py runserver
