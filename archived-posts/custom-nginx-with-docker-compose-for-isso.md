---
title: Isso를 위해 Docker Compose로 Custom Nginx 띄우기
pubDatetime: 2023-10-15T00:25:00+09:00
featured: true
draft: false
tags:
  - Docker
  - Docker-Compose
  - Nginx
description: docker compose를 이용해 nginx를 띄워 보자.
---

## Table of contents

## 들어가며

최근에 `isso`를 docker로 띄워서 blog에 붙이려고 했다.  
그런데 이 때 nginx도 같이 띄워야 하는데, local에 nginx를 설치하기 싫어서, docker compose를 이용해 띄워 보려고 한다.

## Docker로 Nginx 서비스 띄우기

하기 명령어로 `nginx` docker image를 pull해 오자.

```zsh
docker pull nginx
```

그런 다음, 하기 명령어로 `nginx` docker container를 `nginx-server`라는 이름으로 띄우자.

```zsh
docker run --name nginx-server -d -p 80:80 nginx
```

80번 port로 container가 잘 띄워졌는지, 하기 명령어로 확인하자.

```zsh
curl -X GET 127.0.0.1:80
```

하기와 같이 html 문서가 나오면 잘 된 것이다.

```html
<!doctype html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      html {
        color-scheme: light dark;
      }
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and
      working. Further configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

## `isso`를 위한 Custom Nginx Docker Image Build하기

`isso`를 위해 custom nginx docker image를 build할 것이다.  
일단 이를 위해 작업 directory 하나를 만든다.

```zsh
mkdir custom-nginx-for-isso
cd custom-nginx-for-isso
```

`default.conf`:

```nginx
upstream app {
	server isso:8080 # server container name

}
server {
    listen 8080;

    location / {
        proxy_pass http://app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

`Dockerfile`:

```dockerfile
FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
```

`docker build -t custom-nginx-for-isso .`로 `custom-nginx-for-isso` docker image를 build한다.

## 참고 문서

- <https://hub.docker.com/_/nginx>
- <https://basketdeveloper.tistory.com/37>
