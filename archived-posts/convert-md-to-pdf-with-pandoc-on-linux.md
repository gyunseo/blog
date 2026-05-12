---
title: Linux에서 pandoc을 이용해 md을 pdf로 변환하자.
postSlug: convert-md-to-pdf-with-pandoc-on-linux
pubDatetime: 2023-09-10T23:12:00+09:00
featured: false
draft: false
tags:
  - linux
  - pandoc
  - markdown
  - pdf
  - WSL
description: pandoc을 설치해서, md를 pdf로 변환하는 과정을 담았습니다.
---

## Table of contents

## 들어가며

WSL에서 google-chrome을 깔아도 도저히 md가 pdf로 변환이 안된다. 그래서 pandoc을 이용해서 변환하기로 마음 먹었다.

## 설치 Bash Script

```zsh
sudo apt install -y \
  pandoc \
  texlive-full
```

## markdown을 pdf로 변환하는 Bash Script

```zsh
# pandoc --pdf-engine=xelatex -V CJKmainfont="한글 지원 폰트" test.md -o test.pdf
pandoc --pdf-engine=xelatex -V CJKmainfont="Sarasa Mono K" test.md -o test.pdf
```

상기와 같이 입력하면 CJK main font만 지정된 폰트로 변환된다.  
그래서 모든 폰트를 원하는 폰트로 설정하려면 하기와 같이, md 파일 가장 상단에 font를 지정하면 된다.

```md
---
mainfont: Sarasa Mono K
monofont: Sarasa Mono K
CJKmainfont: Sarasa Mono K
CJKmonofont: Sarasa Mono K
---
```

참고로, `\newpage`나 `\pagebreak`를 사용하면, 새 페이지로 넘어간다.  
이렇게 설정한 후, 하기 명령어를 입력하면,
`main`, `mono`, `CJKmain`, `CJKmono` font가 모두 `Sarasa Mono K`로 설정이 된다.

```zsh
pandoc --pdf-engine=xelatex test.md -o test.pdf
```

## 한글 지원 폰트 확인하는 Bash Script

```zsh
fc-list :lang=ko
```

## 실행 결과

```zsh
/usr/share/fonts/truetype/nanum/NanumSquare_acR.ttf: 나눔스퀘어_ac,NanumSquare_ac:style=Regular
/usr/share/fonts/truetype/nanum/NanumSquareRoundB.ttf: 나눔스퀘어라운드,NanumSquareRound,NanumSquareRound Bold,나눔스퀘어라운드 Bold:style=Bold,Regular
/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK SC:style=Bold
/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK TC:style=Bold
/usr/share/fonts/truetype/nanum/NanumMyeongjoEcoR.ttf: 나눔명조 에코,NanumMyeongjo Eco:style=Regular
/usr/share/fonts/truetype/nanum/NanumGothicCodingBold.ttf: 나눔고딕코딩,NanumGothicCoding:style=Bold
/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK JP:style=Bold
/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK HK:style=Bold
/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK KR:style=Bold
/usr/share/fonts/truetype/nanum/NanumSquareRoundR.ttf: 나눔스퀘어라운드,NanumSquareRound,NanumSquareRound Regular,나눔스퀘어라운드 Regular:style=Regular
/usr/share/fonts/truetype/nanum/NanumSquareB.ttf: 나눔스퀘어,NanumSquare,NanumSquare Bold,나눔스퀘어 Bold:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans CJK JP:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans CJK HK:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans CJK KR:style=Regular
/usr/share/fonts/truetype/nanum/NanumGothicLight.ttf: 나눔고딕,NanumGothic,NanumGothic Light,나눔고딕 Light:style=Light,Regular
/usr/share/fonts/truetype/nanum/NanumGothicEcoR.ttf: 나눔고딕 에코,NanumGothic Eco:style=Regular
/usr/share/fonts/truetype/nanum/NanumBrush.ttf: 나눔손글씨 붓,Nanum Brush Script:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans CJK SC:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans CJK TC:style=Regular
/usr/share/fonts/truetype/nanum/NanumBarunGothic.ttf: 나눔바른고딕,NanumBarunGothic:style=Regular
/usr/share/fonts/truetype/nanum/NanumBarunGothicUltraLight.ttf: 나눔바른고딕,NanumBarunGothic,NanumBarunGothic UltraLight,나눔바른고딕 UltraLight:style=UltraLight
/usr/share/fonts/truetype/nanum/NanumSquare_acL.ttf: 나눔스퀘어_ac,NanumSquare_ac,NanumSquare_ac Light,나눔스퀘어_ac Light:style=Light
/usr/share/fonts/truetype/nanum/NanumSquare_acB.ttf: 나눔스퀘어_ac,NanumSquare_ac,NanumSquare_ac Bold,나눔스퀘어_ac Bold:style=ExtraBold
/usr/share/fonts/truetype/nanum/NanumGothicEcoExtraBold.ttf: 나눔고딕 에코,NanumGothic Eco,NanumGothic Eco ExtraBold,나눔고딕 에코 ExtraBold:style=ExtraBold
/usr/share/fonts/truetype/nanum/NanumSquare_acEB.ttf: 나눔스퀘어_ac,NanumSquare_ac,NanumSquare_ac ExtraBold,나눔스퀘어_ac ExtraBold:style=ExtraBold
/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc: Noto Serif CJK SC:style=Regular
/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc: Noto Serif CJK TC:style=Regular
/usr/share/fonts/truetype/nanum/NanumGothic.ttf: 나눔고딕,NanumGothic:style=Regular
/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc: Noto Serif CJK JP:style=Regular
/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc: Noto Serif CJK KR:style=Regular
/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc: Noto Serif CJK HK:style=Regular
/usr/share/fonts/truetype/nanum/NanumGothicEcoBold.ttf: 나눔고딕 에코,NanumGothic Eco:style=Bold
/usr/share/fonts/truetype/nanum/NanumBarunpenB.ttf: 나눔바른펜,NanumBarunpen,NanumBarunpen Bold:style=Bold
/usr/share/fonts/truetype/nanum/NanumGothicEco.ttf: 나눔고딕 에코,NanumGothic Eco:style=Regular
/usr/share/fonts/truetype/nanum/NanumBarunGothic-YetHangul.ttf: 나눔바른고딕 옛한글,NanumBarunGothic YetHangul:style=Regular
/usr/share/fonts/truetype/nanum/NanumGothicCoding.ttf: 나눔고딕코딩,NanumGothicCoding:style=Regular
/usr/share/fonts/truetype/nanum/NanumBarunGothicBold.ttf: 나눔바른고딕,NanumBarunGothic:style=Bold
/usr/share/fonts/truetype/nanum/NanumPen.ttf: 나눔손글씨 펜,Nanum Pen Script:style=Regular
/usr/share/fonts/truetype/nanum/NanumBarunGothicLight.ttf: 나눔바른고딕,NanumBarunGothic,NanumBarunGothic Light,나눔바른고딕 Light:style=Light
/usr/share/fonts/truetype/nanum/NanumSquareRoundL.ttf: 나눔스퀘어라운드,NanumSquareRound,NanumSquareRound Light,나눔스퀘어라운드 Light:style=Light,Regular
/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf: 나눔고딕,NanumGothic:style=Bold
/usr/share/fonts/truetype/nanum/NanumMyeongjoEcoExtraBold.ttf: 나눔명조 에코,NanumMyeongjo Eco,NanumMyeongjo Eco ExtraBold,나눔명조 에코 ExtraBold:style=ExtraBold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans Mono CJK TC:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans Mono CJK SC:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans Mono CJK KR:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans Mono CJK HK:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans Mono CJK JP:style=Bold
/usr/share/fonts/truetype/nanum/NanumSquareEB.ttf: 나눔스퀘어,NanumSquare,NanumSquare ExtraBold,나눔스퀘어 ExtraBold:style=ExtraBold
/usr/share/fonts/truetype/nanum/NanumMyeongjoEcoBold.ttf: 나눔명조 에코,NanumMyeongjo Eco:style=Bold
/usr/share/fonts/truetype/nanum/NanumMyeongjo-YetHangul.ttf: 나눔명조 옛한글,NanumMyeongjo YetHangul:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans Mono CJK SC:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans Mono CJK TC:style=Regular
/usr/share/fonts/truetype/nanum/NanumMyeongjoEco.ttf: 나눔명조 에코,NanumMyeongjo Eco:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans Mono CJK HK:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans Mono CJK KR:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans Mono CJK JP:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans CJK JP:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans CJK KR:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans CJK HK:style=Bold
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans CJK TC:style=Bold
/usr/share/fonts/truetype/nanum/NanumBarunpenR.ttf: 나눔바른펜,NanumBarunpen:style=Regular
/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc: Noto Sans CJK SC:style=Bold
/usr/share/fonts/truetype/nanum/NanumSquareR.ttf: 나눔스퀘어,NanumSquare:style=Regular
/usr/share/fonts/truetype/nanum/NanumMyeongjo.ttf: 나눔명조,NanumMyeongjo:style=Regular
/usr/share/fonts/truetype/nanum/NanumSquareL.ttf: 나눔스퀘어,NanumSquare,NanumSquare Light,나눔스퀘어 Light:style=Light
/usr/share/fonts/truetype/nanum/NanumMyeongjoBold.ttf: 나눔명조,NanumMyeongjo:style=Bold
/usr/share/fonts/truetype/nanum/NanumMyeongjoExtraBold.ttf: 나눔명조,NanumMyeongjo,NanumMyeongjoExtraBold,나눔명조 ExtraBold:style=ExtraBold
/usr/share/fonts/truetype/nanum/NanumSquareRoundEB.ttf: 나눔스퀘어라운드,NanumSquareRound,NanumSquareRound ExtraBold,나눔스퀘어라운드 ExtraBold:style=ExtraBold,Regular
/usr/share/fonts/truetype/nanum/NanumGothicExtraBold.ttf: 나눔고딕,NanumGothic,NanumGothicExtraBold,나눔고딕 ExtraBold:style=ExtraBold
```

## 참고 문서

- <https://tex.stackexchange.com/questions/341809/pandoc-does-not-recognize-chinese-characters>
- <https://stackoverflow.com/questions/16965490/pandoc-markdown-page-break>
