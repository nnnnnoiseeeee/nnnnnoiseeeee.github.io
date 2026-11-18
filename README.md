# KIM JIHUN — Portfolio

**Live: https://nnnnnoiseeeee.github.io/**

김지훈(@noisehooooon)의 사진·영상 작업 아카이브. 정적 사이트(HTML/CSS/JS)라 빌드 과정 없이 GitHub Pages 등 어떤 정적 호스팅에도 그대로 올릴 수 있습니다.

이 저장소(`nnnnnoiseeeee.github.io`)는 `main` 브랜치 루트에서 GitHub Pages로 배포됩니다. 수정 후 `git push` 하면 1~2분 안에 사이트에 반영됩니다.

## 구조

```
portfolio-site/
├── index.html          페이지 골격 (섹션, 오버레이 컨테이너)
├── styles.css          전체 스타일 (컬러·타이포 토큰은 :root)
├── app.js              렌더링 + 라이트박스 / 상세 / 노트 모달
├── data.js             ★ 모든 콘텐츠 (프로젝트·노트·소개·연락처)
└── assets/
    └── projects/       웹용으로 리사이즈한 이미지 (긴 변 2000px, JPEG q84)
```

## 콘텐츠 수정

모든 텍스트와 이미지 경로는 **`data.js` 한 파일**에서 관리합니다.

### 프로젝트 추가
`window.SITE.projects` 배열 맨 앞에 항목을 추가합니다.

```js
{
  id: "my-project",              // 고유 id (#work/my-project 로 바로 열림)
  no: "07",                      // 카드에 표시되는 번호
  title: "프로젝트 제목",
  short: "짧은 이름",             // 상세 하단 이전/다음에 표시
  category: "Event",             // 필터 칩으로 자동 생성됨
  year: "2026",
  date: "2026.11",
  role: "Photography",
  note: "현장 기록",
  description: "설명 문단",
  cover: { src: "assets/projects/my-cover.jpg", alt: "설명", w: 2000, h: 1333 },
  images: [
    { src: "assets/projects/my-01.jpg", alt: "설명", w: 2000, h: 1333, caption: "캡션" }
  ]
}
```

- 이미지 `w`/`h` 는 원본 픽셀 크기입니다. 레이아웃 흔들림(CLS)을 막아주므로 꼭 적어 주세요.
- 그리드 배치는 `app.js` 의 `LAYOUT` 배열(12컬럼 기준 시작열/폭/세로 오프셋)을 순환하며 적용됩니다. 카드 순서를 바꾸면 배치도 함께 바뀝니다.
- 모바일(≤860px)에서는 자동으로 1열이 됩니다.

### 노트(블로그) 추가
`window.SITE.notes` 배열 맨 앞에 추가합니다.

```js
{
  id: "note-2026-11",
  date: "2026.11",
  title: "글 제목",
  excerpt: "목록에 보이는 한두 문장",
  tags: ["Behind"],
  body: ["첫 문단", "두 번째 문단"]
}
```

## 이미지 넣는 법

1. 원본을 긴 변 2000px 정도로 줄여 JPEG(품질 80~85)로 저장합니다.
   ```bash
   python3 -c "from PIL import Image,ImageOps; im=ImageOps.exif_transpose(Image.open('src.jpg')).convert('RGB'); im.thumbnail((2000,2000)); im.save('assets/projects/name.jpg','JPEG',quality=84,optimize=True,progressive=True)"
   ```
2. `assets/projects/` 에 넣고 `data.js` 경로를 맞춥니다.

## 로컬에서 보기

```bash
cd portfolio-site
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## 배포 (GitHub Pages)

이 폴더 내용을 저장소 루트에 푸시하고 Settings → Pages 에서 브랜치 `main` / 폴더 `/ (root)` 를 선택하면 됩니다.
`.nojekyll` 파일이 포함되어 있어 `_` 로 시작하는 파일도 그대로 배포됩니다.
