#/usr/bin

python3 -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
npm install
npm run dev
python manage.py runserver
