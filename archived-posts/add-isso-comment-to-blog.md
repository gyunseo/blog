---
title: 블로그에 Isso Comment 추가하기
pubDatetime: 2023-10-14T20:22:00+09:00
featured: true
draft: false
tags:
  - blog
  - Comment
  - Docker
  - Docker-Compose
  - Isso
description: giscus는 GitHub 계정이 없는 사람의 경우 이용할 수가 없다...
---

## Table of contents

## 들어가며

최근에 블로그에 giscus를 이용해 댓글 기능을 달았었다. (giscus를 블로그에 달기 포스트 작성하기)
giscus는 GitHub 계정을 가진 사람만이 댓글을 달 수 있어서, 아무래도 일반인들에게는 댓글 작성에 있어 어려움이 존재한다.  
그래서 이번 포스트에서는 [isso](https://github.com/posativ/isso/)를 이용해, 일반인들도 댓글을 달 수 있게 하기 위해, blog에 comment 기능을 추가하려고 한다.

## [isso](https://github.com/posativ/isso/)Repository git clone하기

하기 명령어로 git clone을 하자.

```zsh
git clone https://github.com/posativ/isso.git
```

그 다음 vscode를 이용하든, 그대로 shell에서 편집을 하든 마음대로 repo의 file들과 repository들을 수정 및 변경하면 된다.

## `$PWD/config`, `$PWD/db` Directory 생성

하기 명령어로, isso repository에 `config`와 `db` directory를 생성하자.

```zsh
# isso repository에서...
pwd
# outputs: /home/gyunseo/isso
mkdir config db
ls | grep config db
# outputs: db
ls | grep config config
# outputs: config
```

## `$PWD/config/isso.cfg`를 추가하고, 수정하기

하기 명령어로, `$PWD/config/isso.cfg` file을 생성하자.

```zsh
touch config/isso.cfg
```

그리고 하기와 같은 내용으로 file을 수정하자.

```
[general]
; database location, check permissions,
; automatically created if it does not exist
dbpath = /db/comments.db

; your website or blog (not the location of Isso!)
host = https://yourdomain.tld/

[admin]
; admin interface in /admin
enabled = true
password = abc123

[guard]
; basic spam protection
enabled = true

; limit to N new comments per minute.
ratelimit = 5

; how many comments directly to the thread
direct-reply = 3

; allow commenters to reply to their own comments when they could still edit the comment.
reply-to-self = false
require-author = false
require-email = false
```

- `dbpath` and `host` is mandatory.
- `dbpath` is the full path of sqlite3 database.
- `host` is your site URL (include `http://` or `https://`). It can have multiple values. config it correctly to avoid cross domain attack (CORS).
- Enable admin to manage comment through web interface.
- Enable guard to avoid spam.

## docker image build

`isso` repo에서 하기 명령어로 docker image를 build하자.

```zsh
make docker
```

그러면 `isso`라는 이름의 docker image가 생성된다.  
`docker image ls`로 확인하자.

## docker run

하기 명령어로 docker container를 run하자.

```zsh
docker run -d --rm --name isso -p 127.0.0.1:8080:8080 \
    -v $PWD/config:/config -v $PWD/db:/db \
    isso
```

`docker ps -a` 명령어로 실행 중인 docker container를 확인할 수 있다.

## 참고 문서

- <https://isso-comments.de/docs/reference/installation/#using-docker>
- <https://isso-comments.de/docs/reference/server-config/>
- <https://djangocas.dev/blog/hugo/isso-static-blog-comments-setup-and-internal/>
- <https://oktomus.com/posts/2020/add-comments-to-a-static-blog-with-isso/>
