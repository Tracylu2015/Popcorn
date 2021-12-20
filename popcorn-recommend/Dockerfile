FROM python:3.8-bullseye

RUN apt-get update -y

COPY ./requirements.txt /app/requirements.txt
COPY ./models /app/models

WORKDIR /app

# Install packages. Flask, Mysql Client, Bcrypt and etc
RUN pip install -r requirements.txt

COPY ./main.py /app/main.py
COPY ./model.py /app/model.py

# Start up command
ENTRYPOINT [ "python" ]

# Start up arguments
CMD [ "main.py" ]