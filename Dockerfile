FROM node:18-bullseye

# تثبيت أدوات البناء
RUN apt-get update && apt-get install -y \
    wget build-essential zlib1g-dev libncurses5-dev \
    libgdbm-dev libnss3-dev libssl-dev libreadline-dev \
    libffi-dev libsqlite3-dev curl libbz2-dev

# تحميل وبناء Python 3.12.3 من المصدر
RUN wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz && \
    tar -xvzf Python-3.12.3.tgz && \
    cd Python-3.12.3 && \
    ./configure --enable-optimizations && \
    make -j$(nproc) && \
    make altinstall

# تأكد إن Python 3.12 هو الافتراضي
RUN ln -sf /usr/local/bin/python3.12 /usr/bin/python3 && \
    ln -sf /usr/local/bin/pip3.12 /usr/bin/pip3

# باقي خطوات المشروع (React setup أو أي حاجة تانية)
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "start"]
