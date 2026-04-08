# Thumbnail Maker (썸네일 메이커)

순수 HTML5 SVG와 Vanilla JS/CSS를 활용하여 빠르고 쉽게 텍스트 기반 썸네일 이미지를 생성할 수 있는 웹 서비스입니다.

**바로 사용하기**: https://danielk0121.github.io/thumbnailmaker/app/

## 주요 기능

- 텍스트 입력 및 자동 줄바꿈 (한글/영문 모두 지원)
- 단색 / 그라데이션 배경 (기본: 하늘색 → 연보라 그라데이션)
- 랜덤 색상 생성
- 모서리 각지게 / 둥글게 선택
- 글자 크기 조절 (10px 단위, 기본 70px)
- 해상도 자유 설정 (기본 400x400)
- PNG / JPG / SVG 저장
- 클립보드 복사 (PNG)

## 폴더 구조

```text
thumbnailmaker/
├── app/
│   ├── index.html      # 메인 페이지
│   ├── main.js         # 핵심 로직
│   ├── style.css       # 스타일
│   └── assets/         # og-image.png (파비콘 및 OG 태그용)
├── spec/
│   └── PRD.md          # 기능 요구사항 문서
├── CLAUDE.md           # 프로젝트 개발 규칙
└── README.md
```

## 기술 스택

- Vanilla JS / HTML5 / CSS3
- SVG 기반 렌더링
- Canvas API (PNG/JPG 변환)
- 외부 라이브러리 없음

## 라이선스

MIT License
