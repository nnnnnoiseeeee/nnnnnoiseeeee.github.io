/* ==========================================================================
   KIM JIHUN — portfolio data
   이 파일만 수정하면 사이트 내용이 바뀝니다.
   - profile : 이름, 소개, 연락처
   - projects: 작업물 (이미지는 assets/projects/ 에 넣고 경로를 적습니다)
   - notes   : 노트/저널 글
   새 항목은 배열 맨 앞에 추가하면 최신순으로 보입니다.
   ========================================================================== */

window.SITE = {
  profile: {
    name: "KIM JIHUN",
    handle: "@noisehooooon",
    role: "Photographer & Videographer",
    email: "hoooonz91@gmail.com",
    instagram: "https://www.instagram.com/noisehooooon",
    instagramHandle: "@noisehooooon",
    location: "Seoul, Korea",
    intro:
      "행사·전시·공연·패션 룩북·스트리트 포토와 영상.\n브랜드와 사람의 순간을 기록합니다.",
    about: [
      "KIM JIHUN은 김지훈(@noisehooooon)의 사진·영상 작업 아카이브입니다.",
      "행사와 전시, 공연 현장에서 시작해 패션 룩북과 스트리트 포토까지 — 카메라 앞에 놓인 장면을 과장 없이 남기는 일을 합니다. 촬영과 편집, 컬러 작업까지 직접 진행하며, 현장의 동선과 빛을 먼저 확인한 뒤 최소한의 장비로 화면을 정리합니다.",
      "2026년에는 아르반(AREUBAN) 26FW 룩북, 하회 2026 테마파크 페스티벌 사전 홍보영상 및 현장 기록, 채유라 개인전 《흙과 몸》, 2026 울산아트페어, 어방 빛 조형 현장 기록 등을 촬영했습니다."
    ],
    services: [
      { key: "Photo", value: "행사·전시·공연 스틸, 브랜드 룩북, 스트리트 포토" },
      { key: "Video", value: "사전 홍보영상, 현장 기록, 짧은 클립" },
      { key: "Post", value: "셀렉·리터칭·컬러 그레이딩, 영상 편집" },
      { key: "Contact", value: "hoooonz91@gmail.com · @noisehooooon" }
    ]
  },

  opening: {
    src: "assets/projects/eobang-01.jpg",
    alt: "밤하늘 아래 설치된 물고기 조형 등불과 빛의 바당",
    caption: "Eobang, 빛의 바당",
    year: "2026"
  },

  projects: [
    {
      id: "eobang",
      no: "06",
      title: "Eobang — 빛의 바당",
      short: "Eobang",
      category: "Street",
      year: "2026",
      date: "2026.06",
      role: "Photography",
      note: "빛 조형 · 야간 기록",
      description:
        "물고기 떼처럼 매달린 등불과, 소원을 적어 건 등불이 겹쳐 있는 밤. 인공적인 빛이지만 화면에서는 오히려 자연광처럼 읽히는 순간을 기준으로 촬영했습니다. 어두운 배경에 빛의 밀도만 남기는 것이 이 현장의 핵심이었습니다.",
      cover: { src: "assets/projects/eobang-01.jpg", alt: "물고기 조형 등불이 물결처럼 이어진 야경", w: 2000, h: 1333 },
      images: [
        { src: "assets/projects/eobang-01.jpg", alt: "물고기 조형 등불이 물결처럼 이어진 야경", w: 2000, h: 1333, caption: "빛의 바당, 물고기 조형" },
        { src: "assets/projects/eobang-02.jpg", alt: "소원을 적은 등불이 파란 하늘 아래 매달린 풍경", w: 2000, h: 1333, caption: "소원 등불" }
      ]
    },
    {
      id: "nasup",
      no: "05",
      title: "260815 나숲 쿄 파티",
      short: "나숲 쿄 파티",
      category: "Event",
      year: "2026",
      date: "2026.08",
      role: "Photography",
      note: "파티 · 나이트",
      description:
        "붉은 조명 하나로 채워진 공간. 플래시와 느린 셔터를 섞어 사람의 움직임을 지우고 빛의 흔적만 남겼습니다. 어두운 현장에서 초점보다 분위기를 우선한 기록입니다.",
      cover: { src: "assets/projects/nasup-01.jpg", alt: "붉은 조명 아래 DJ 부스", w: 2000, h: 1333 },
      images: [
        { src: "assets/projects/nasup-01.jpg", alt: "붉은 조명 아래 DJ 부스", w: 2000, h: 1333, caption: "쿄 파티, DJ 부스" },
        { src: "assets/projects/nasup-02.jpg", alt: "붉은 빛으로 번진 파티 현장의 사람들", w: 2000, h: 1333, caption: "플로어" }
      ]
    },
    {
      id: "ulsan",
      no: "04",
      title: "2026 울산아트페어",
      short: "울산아트페어",
      category: "Event",
      year: "2026",
      date: "2026.06",
      role: "Photography",
      note: "아트페어 · 현장 기록",
      description:
        "부스와 사람, 작품이 한 화면에 겹치는 구조. 전시장의 밝은 조명을 그대로 두고 관람객의 동선을 따라가며 기록했습니다. 작품을 단독으로 떼어내기보다, 작품이 놓인 자리의 공기를 남기는 쪽을 택했습니다.",
      cover: { src: "assets/projects/ulsan-01.jpg", alt: "2026 UIAF 배너가 걸린 전시장 입구", w: 2000, h: 1333 },
      images: [
        { src: "assets/projects/ulsan-01.jpg", alt: "2026 UIAF 배너가 걸린 전시장 입구", w: 2000, h: 1333, caption: "전시장 입구" },
        { src: "assets/projects/ulsan-02.jpg", alt: "부스 사이로 이어지는 관람객 동선", w: 2000, h: 1333, caption: "부스와 동선" }
      ]
    },
    {
      id: "chaeyura",
      no: "03",
      title: "채유라 《흙과 몸》",
      short: "흙과 몸",
      category: "Exhibition",
      year: "2026",
      date: "2026.08",
      role: "Photography",
      note: "개인전 · 전시 기록",
      description:
        "작업실 밖 들판에서 진행된 설치와 퍼포먼스. 해가 기울며 바뀌는 빛에 맞춰 같은 자리를 여러 번 담았습니다. 흙의 표면과 몸이 만나는 지점, 그리고 그 둘이 구분되지 않는 컷을 중심으로 정리했습니다.",
      cover: { src: "assets/projects/chaeyura-01.jpg", alt: "들판에 놓인 흙 조형과 그 안의 작가", w: 1500, h: 2000 },
      images: [
        { src: "assets/projects/chaeyura-01.jpg", alt: "들판에 놓인 흙 조형과 그 안의 작가", w: 1500, h: 2000, caption: "《흙과 몸》, 설치 전경" },
        { src: "assets/projects/chaeyura-02.jpg", alt: "흙 조형에 기대 앉은 작가", w: 2000, h: 1500, caption: "몸과 흙" }
      ]
    },
    {
      id: "hahoe",
      no: "02",
      title: "Hahoe Festival 2026",
      short: "Hahoe 2026",
      category: "Festival",
      year: "2026",
      date: "2026.06",
      role: "Photo · Video",
      note: "사전 홍보영상 · 현장 기록",
      description:
        "하회 2026 테마파크 페스티벌. 사전 홍보영상 촬영과 함께 현장 스틸을 기록했습니다. 낮에는 캐노피와 마당의 색이, 밤에는 무대 조명이 한지와 기와에 번지는 빛이 화면의 기준이 되었습니다. 영상과 스틸을 같은 동선에서 함께 담아, 결과물마다 같은 장면이 다르게 남도록 했습니다.",
      cover: { src: "assets/projects/hahoe-01.jpg", alt: "밤에 열린 야외 무대와 관객", w: 2176, h: 1632 },
      images: [
        { src: "assets/projects/hahoe-01.jpg", alt: "밤에 열린 야외 무대와 관객", w: 2176, h: 1632, caption: "야간 무대" },
        { src: "assets/projects/hahoe-02.jpg", alt: "캐노피 아래 밴드의 낮 공연", w: 1333, h: 2000, caption: "낮의 스테이지" }
      ]
    },
    {
      id: "areuban",
      no: "01",
      title: "AREUBAN 26FW Lookbook",
      short: "AREUBAN 26FW",
      category: "Lookbook",
      year: "2026",
      date: "2026.07",
      role: "Photography",
      note: "룩북 · 스튜디오",
      description:
        "흰 배경 하나, 한 방향의 조명. 아르반 26FW 룩북은 배경을 최대한 비우고 옷의 실루엣과 원단의 표면만 남기는 방식으로 촬영했습니다. 같은 옷을 앞·옆·뒤로 반복해 찍고, 그중에서 형태가 가장 분명한 컷을 골랐습니다.",
      cover: { src: "assets/projects/areuban-01.jpg", alt: "검정 니트를 입은 모델의 옆모습", w: 1487, h: 1982 },
      images: [
        { src: "assets/projects/areuban-01.jpg", alt: "검정 니트를 입은 모델의 옆모습", w: 1487, h: 1982, caption: "26FW 룩북" },
        { src: "assets/projects/areuban-02.jpg", alt: "후드를 쓴 모델의 정면 클로즈업", w: 1500, h: 2000, caption: "26FW 룩북" }
      ]
    }
  ],

  notes: [
    {
      id: "note-white",
      date: "2026.07",
      title: "화이트 배경에 검정 옷",
      excerpt:
        "흰 배경은 편하지만 어렵다. 옷이 놓이는 위치도, 어깨선이 만드는 각도도 화면 안에서 다 계산해야 하기 때문이다.",
      tags: ["Lookbook", "Studio"],
      body: [
        "흰 배경은 편하지만 어렵다. 옷이 놓이는 위치도, 어깨선이 만드는 각도도, 카메라와 모델 사이의 거리도 화면 안에서 다 계산해야 하기 때문이다. 배경이 비어 있을수록 실수도 그대로 남는다.",
        "아르반 26FW 룩북은 그 계산을 최대한 단순하게 가져갔다. 배경은 비우고, 조명은 한 방향으로 두고, 옷의 실루엣과 원단의 표면이 드러나는 컷을 중심으로 셀렉했다. 검정 옷은 빛을 먹는 대신 표면의 결을 남긴다. 그 결이 살아 있는 프레임을 고르는 일이 이번 촬영의 대부분이었다.",
        "한 벌의 옷을 앞·옆·뒤로 반복해서 찍는 일은 지루해 보인다. 하지만 그 반복이 있어야 룩북은 예쁜 사진 모음이 아니라 옷에 대한 기록이 된다."
      ]
    },
    {
      id: "note-hahoe",
      date: "2026.06",
      title: "하회의 낮과 밤",
      excerpt:
        "같은 무대인데 낮과 밤의 표정이 완전히 달랐다. 캐노피의 색과, 한지에 번지는 무대 조명 — 두 개의 현장을 한 번의 동선으로 담았다.",
      tags: ["Festival", "Video"],
      body: [
        "하회 2026 테마파크 페스티벌은 낮과 밤의 표정이 완전히 달랐다. 낮에는 캐노피가 만드는 색의 면적이 화면을 지배했고, 해가 지면 무대 조명이 한지와 기와에 번지면서 같은 자리가 다른 공간처럼 바뀌었다.",
        "사전 홍보영상과 현장 스틸을 같은 동선에서 함께 담았다. 영상은 움직임과 소리를 따라가고, 스틸은 그 사이에 놓인 정지된 순간을 가져간다. 두 결과물이 같은 장면을 다르게 남기는 것이 목적이었다.",
        "현장 기록에서 가장 오래 고민한 것은 밤의 색이다. 조명이 강한 무대는 쉽게 새빨갛거나 새파랗게 눌린다. 그 색을 지우지 않되, 사람의 표정이 사라지지 않는 선에서 균형을 잡았다."
      ]
    },
    {
      id: "note-clay",
      date: "2026.08",
      title: "흙이 마르기 전에",
      excerpt:
        "《흙과 몸》은 작업실 밖에서 진행됐다. 흙은 마르면 색이 옅어지고 형태도 조금씩 달라진다. 그래서 전시 기록은 한 번의 촬영으로 끝나지 않는다.",
      tags: ["Exhibition", "Natural light"],
      body: [
        "채유라 작가의 《흙과 몸》은 작업실 밖, 들판에서 진행됐다. 흙으로 만든 형태 안에 몸이 들어가고, 그 둘의 경계가 사진에서 흐려지는 것이 이 작업의 핵심이라고 느꼈다.",
        "흙은 마르면 색이 옅어지고 형태도 조금씩 달라진다. 그래서 전시 기록은 한 번의 촬영으로 끝나지 않는다. 같은 자리에서 시간을 두고 다시 찍는 일이 의미를 갖는다.",
        "해가 기울 무렵의 빛을 기다렸다. 낮의 직사광보다, 그림자가 길어지며 흙의 표면이 드러나는 시간이 이 작업에 어울렸다."
      ]
    },
    {
      id: "note-light",
      date: "2026.06",
      title: "빛으로 만든 바다",
      excerpt:
        "어방의 빛 조형은 사진으로 담기 어려운 종류의 빛이다. 수백 개의 작은 광원이 겹치면서 하나의 면처럼 보이기 때문이다.",
      tags: ["Night", "Street"],
      body: [
        "어방의 빛 조형은 사진으로 담기 어려운 종류의 빛이다. 수백 개의 작은 광원이 겹치면서 하나의 면처럼 보이고, 그 면이 다시 물고기 떼의 형태로 읽힌다.",
        "이런 현장에서는 노출을 어디에 두느냐가 전부다. 밝은 등 하나에 맞추면 나머지가 사라지고, 전체에 맞추면 빛의 밀도가 죽는다. 몇 컷을 찍어 보고 나서야 기준이 잡혔다.",
        "결국 고른 것은 배경을 최대한 어둡게 두고, 빛의 윤곽만 남긴 사진이었다. 인공적인 빛이지만 화면에서는 오히려 자연광처럼 읽히는 순간이 있었다."
      ]
    }
  ]
};
