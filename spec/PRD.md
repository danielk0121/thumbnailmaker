# 📝 Product Requirements Document (PRD)

## 1. 프로젝트 목적
별도의 프레임워크 없이 순수 웹 기술(HTML, CSS, JS)과 SVG를 활용하여 빠르고 가벼운 텍스트 기반 썸네일 생성 도구 제작

## 2. 핵심 기능 요구사항
### 🎨 배경 및 디자인
- **배경 설정**: 단색 지정, 랜덤 색상 생성, 그라데이션(Linear/Radial) 효과 지원
- **모서리 라운드**: 이미지 모서리의 둥글기(Border Radius) 적용 여부 및 수치 조절

### ✍️ 텍스트 편집
- **실시간 입력**: 사용자가 입력하는 텍스트가 즉시 썸네일에 반영
- **크기 조절**: 슬라이더나 입력창을 통한 텍스트 크기 확대 및 축소

### 📐 해상도 및 규격
- **커스텀 해상도**: 가로(Width), 세로(Height) 크기를 직접 지정하여 다양한 규격 대응

### 💾 파일 추출 및 저장
- **이미지 저장**: Canvas API를 활용하여 PNG, JPG 포맷으로 다운로드
- **벡터 저장**: SVG 소스 코드 추출 및 .svg 파일 다운로드 기능

## 3. 기술 스택 (Technical Spec)
- **Language**: JavaScript (Vanilla JS)
- **Markup**: HTML5, SVG (Scalable Vector Graphics)
- **Styling**: Vanilla CSS (CSS3)
- **Directory**: `app/` 폴더 내 모든 소스 코드 관리
- **Deployment**: **GitHub Pages** (app/index.html 직접 공개)

## 4. 폴더 구조 계획
- `app/index.html`: 메인 구조 및 UI
- `app/style.css`: UI 디자인 및 레이아웃
- `app/main.js`: SVG 조작 및 이미지 추출 로직
- `spec/PRD.md`: 상세 기획 문서
