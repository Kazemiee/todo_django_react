## Getting This to Run

### Install Dependencies

python -m pip install --upgrade pip
pip install -r requirements.txt

### Django Setup

cd backend
python manage.py migrate
python manage.py runserver

### Vite Setup

cd frontend
npm install
npm vite
