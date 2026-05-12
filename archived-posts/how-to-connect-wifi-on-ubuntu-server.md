---
author: Gyunseo Lee
title: Ubuntu Server에서 WIFI 연결하기
pubDatetime: 2024-06-25T21:14:00+09:00
modDatetime: 2024-06-25T21:14:00+09:00
featured: false
draft: false
tags:
  - Linux
  - Ubuntu
description: CLI환경에서 WIFI연결하기는 어렵네요...
ogImage: ""
---

## Table of contents

## 들어가며

[이 블로그 참고](https://changun516.tistory.com/120)

`sudo vi /etc/netplan/50-cloud-init.yaml`에서 SSID랑 password입력
해주면 되는데, 그럼 매번 재부팅할 때마다

```
# This file is generated from information provided by the datasource.  Changes
# to it will not persist across an instance reboot.  To disable cloud-init's
# network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}
network:
    ethernets:
        enx00e04c6802e2:
            dhcp4: true
            wakeonlan: true
    version: 2
    wifis:
        wlp2s0:
            optional: true
            access-points:
                "SSID":
                    password: "password"
            dhcp4: true
```

`sudo ip link set wlp2s0 up` 이걸 해줘야 합니다.  
자동으로 up되게 해주려면
`sudo vi /etc/network/interfaces`으로 interfaces file을

```
auto wlp2s0

iface wlp2s0 inet dhcp

        allow-hotplug wlp2s0

        wpa-ssid "ssid"

        wpa-psk "password"
```

이런식으로 바꿔줘야 합니다.
