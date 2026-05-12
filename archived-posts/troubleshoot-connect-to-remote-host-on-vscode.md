---
title: vscode에서 ssh로 remote host에 접속할 때 생기는 오류 정리
pubDatetime: 2023-10-09T18:08:00+09:00
featured: false
draft: false
tags:
  - vscode
  - ssh
description: known_hosts를 수정하자...
---

## Table of contents

## 들어가며

최근에 집에 안 쓰는 Desktop을 Ubuntu Server로 만들었다.  
그래서 그 Server에 SSH로 접속해서 작업을 할 수 있도록 세팅을 해 놓았다.  
그런데 내 laptop vscode에서 ssh로 접속하려니 다음과 같은 에러가 나왔다.

```
> @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
> Someone could be eavesdropping on you right now (man-in-the-middle attack)!
> It is also possible that a host key has just been changed.
> The fingerprint for the ED25519 key sent by the remote host is
> SHA256:9rql3UcGZ9+lxGLPNA6ViLuT2+jfSFrvaQhQwyF1RZM.
> Please contact your system administrator.
> Add correct host key in C:\\Users\\rbstj/.ssh/known_hosts to get rid of this message.
> Offending ECDSA key in C:\\Users\\rbstj/.ssh/known_hosts:3
> Host key for gyunseo0311.iptime.org has changed and you have requested strict checking.
> Host key verification failed.
> 프로세스에서 없는 파이프에 쓰려고 했습니다.
> ]0;C:\Windows\System32\cmd.exe
[17:53:00.587] Got some output, clearing connection timeout
[17:53:01.852] "install" terminal command done
[17:53:01.853] Install terminal quit with output: ]0;C:\Windows\System32\cmd.exe
[17:53:01.853] Received install output: ]0;C:\Windows\System32\cmd.exe
[17:53:01.854] Failed to parse remote port from server output
[17:53:01.855] Resolver error: Error:
    at g.Create (c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:640937)

    at t.handleInstallOutput (c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:638303)

    at t.tryInstall (c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:760218)

    at async c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:720757

    at async t.withShowDetailsEvent (c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:724063)

    at async I (c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:717728)

    at async t.resolve (c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:721434)

    at async c:\Users\rbstj\.vscode\extensions\ms-vscode-remote.remote-ssh-0.106.5\out\extension.js:2:905238
[17:53:01.861] ------
```

## `C:\Users\[사용자]\.ssh\known_hosts` 파일 수정

```
gyunseo0311.iptime.org ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMboBHBoAxo2GurJbHUm+E380hELagUuBfmZFm9vxgM9
gyunseo0311.iptime.org ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQChQG/YLYy2bUa8HiqcV7QbCL6g1qUasQErObhupWdO+Nk49XPIuuGbn2a2gFSqq3nghAo4z53eJ/r/rzvp2wi7PNC1gFLhIXC4JF8T/CCqGxD6QeWxZQKiw7UhX04g1fLCMTqfCg7RH7NulnivBXNhs6d9miqJQULh9nx4Q91lrsAcmzOX56fzIayK5LhCPr8v0pegoU+xHqEgkdthNyO+uNNazuQdyuzDzMjDXA1WEDmtbO+qTv+S+jaMnAkcNTNIP8tM8blho+k9RzWNwqoQoCQcm5FQdBpgzd2eOH1ixQy9PGippgaATrNOe5TzrBxk7m0SDUZZw1w58o6hgyZl85+rnaDm7BxLkkL7rb7wqVZkoMOVZhjqcTynS4YEJmPLNT6vUgsU/i90sDBRxBlW7CYTi2LQG0GtE7zoFTMQVXjsMJvYugckTYfbHKgt1WUOtQ8d1iWelhhinr9ndZa4hASodx121Kx4z077LjyjxmdvPmuO8X+HojcNIoXciXk=
gyunseo0311.iptime.org ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBBJHiElF87bcJu/K7LAs7iQcDIR6lmKsTHuhT4hosbi7cIo5Bi8aczj970rRzGm29f58M8gaEJ1Lb1lN2uNwxfo=
192.168.0.2 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMboBHBoAxo2GurJbHUm+E380hELagUuBfmZFm9vxgM9
```

`192.168.0.2`, `gyunseo0311.iptime.org` 모두 내 server인데, 이전에 이 노트북에서 다른 방식으로 접속했던 전적이 있어서 그런 것 같다.  
지금 다시 새로 깔린 Ubuntu OS에 접속하려 하니, 전에 있던 인증 정보로 Server에 login하려니 충돌이 난 것 같다.  
그래서 상기 파일 내용을 모두 날리고, 다시 vscode에서 접속하니 잘 됐다. (쑻)

## 참고 문서

<https://visu4l.tistory.com/entry/ssh-%EC%9B%90%EA%B2%A9-%EC%A0%91%EC%86%8D-%EC%97%90%EB%9F%ACWARNING-REMOTE-HOST-IDENTIFICATION-HAS-CHANGED>
