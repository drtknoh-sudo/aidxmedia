# Science Journal 프로젝트 개발 기록

## 프로젝트 개요
- **프로젝트명**: Science Journal (aidxmedia)
- **목적**: Science.org 스타일의 뉴스/논문 웹사이트
- **GitHub**: https://github.com/drtknoh-sudo/aidxmedia.git
- **배포**: Vercel (설정 필요)

---

## 기술 스택
| 구분 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | MDX (next-mdx-remote/rsc) |
| Icons | Lucide React |
| Date | date-fns |
| Deployment | Vercel |

---

## 프로젝트 구조

```
science-journal/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # 공통 레이아웃
│   │   ├── page.tsx                  # 메인 페이지
│   │   ├── globals.css               # 전역 스타일
│   │   ├── about/page.tsx            # About 페이지
│   │   ├── news/
│   │   │   ├── page.tsx              # 뉴스 목록
│   │   │   └── [slug]/page.tsx       # 뉴스 상세
│   │   ├── research/
│   │   │   ├── page.tsx              # 연구 목록
│   │   │   └── [slug]/page.tsx       # 연구 상세
│   │   └── commentary/
│   │       ├── page.tsx              # 논평 목록
│   │       └── [slug]/page.tsx       # 논평 상세
│   │
│   ├── components/
│   │   ├── Header.tsx                # 헤더 네비게이션
│   │   ├── Footer.tsx                # 푸터
│   │   ├── ArticleCard.tsx           # 기사 카드 컴포넌트
│   │   └── MDXContent.tsx            # MDX 렌더러
│   │
│   ├── content/                      # MDX 콘텐츠 폴더
│   │   ├── news/
│   │   │   ├── ai-breakthrough-2026.mdx
│   │   │   └── climate-ocean-discovery.mdx
│   │   ├── research/
│   │   │   ├── quantum-computing-error-correction.mdx
│   │   │   └── neural-interface-study.mdx
│   │   └── commentary/
│   │       └── ai-ethics-future.mdx
│   │
│   └── lib/
│       ├── posts.ts                  # 포스트 데이터 로딩
│       └── utils.ts                  # 유틸리티 함수
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## 주요 기능

### 1. 카테고리 시스템
- **News** (뉴스): 빨간색 태그 (`bg-primary`)
- **Research** (연구): 파란색 태그 (`bg-accent-blue`)
- **Commentary** (논평): 초록색 태그 (`bg-accent-green`)

### 2. MDX 기반 블로그
- Frontmatter 메타데이터 지원
- 마크다운 + JSX 컴포넌트 사용 가능
- 자동 정적 페이지 생성 (SSG)

### 3. 기사 카드 변형
- `featured`: 대형 히어로 카드 (메인 페이지 상단)
- `default`: 일반 카드 (이미지 + 텍스트)
- `compact`: 압축 카드 (사이드바용)

### 4. 반응형 디자인
- 모바일 햄버거 메뉴
- 그리드 레이아웃 (1/2/3 컬럼)

---

## MDX 포스트 작성법

### 파일 위치
```
src/content/{category}/{slug}.mdx
```

### Frontmatter 형식
```yaml
---
title: "기사 제목"
description: "기사 설명 (SEO용)"
date: "2026-01-28"
author: "작성자 이름"
authorRole: "소속/직책" (선택)
category: "news" | "research" | "commentary"
tags: ["태그1", "태그2"]
image: "https://example.com/image.jpg" (선택)
featured: true | false (선택)
---
```

### 본문 작성
- 마크다운 문법 지원
- 코드 블록, 테이블, 인용문 등 사용 가능
- 이미지는 외부 URL 사용

---

## 개발 작업 타임라인

### Phase 1: 분석 및 설계
1. ✅ Science.org 홈페이지 디자인 분석
   - 헤더 네비게이션 구조
   - 피처 기사 + 사이드바 레이아웃
   - 카테고리 태그 시스템

### Phase 2: 프로젝트 초기 설정
2. ✅ Next.js 14 프로젝트 생성
3. ✅ TypeScript 설정
4. ✅ Tailwind CSS 설정 (커스텀 컬러, 폰트)
5. ✅ 의존성 설치 (gray-matter, next-mdx-remote, date-fns, lucide-react)

### Phase 3: 컴포넌트 개발
6. ✅ Header 컴포넌트 (반응형 네비게이션)
7. ✅ Footer 컴포넌트
8. ✅ ArticleCard 컴포넌트 (3가지 변형)
9. ✅ MDXContent 컴포넌트 (next-mdx-remote/rsc 사용)

### Phase 4: 페이지 개발
10. ✅ 메인 페이지 (히어로 + 사이드바 + 섹션)
11. ✅ 카테고리 페이지 (news, research, commentary)
12. ✅ 개별 기사 페이지 (동적 라우팅)
13. ✅ About 페이지

### Phase 5: 콘텐츠 & 유틸리티
14. ✅ posts.ts (MDX 파일 로딩 함수)
15. ✅ utils.ts (날짜 포맷, 카테고리 색상)
16. ✅ 샘플 MDX 콘텐츠 5개 작성

### Phase 6: 빌드 & 배포
17. ✅ 빌드 오류 수정 (MDXRemote → next-mdx-remote/rsc)
18. ✅ 프로덕션 빌드 성공
19. ✅ Git 초기화 및 커밋
20. ✅ GitHub 저장소 푸시 (drtknoh-sudo/aidxmedia)

---

## 해결한 이슈

### 이슈 1: MDXRemote 빌드 오류
**문제**: `Element type is invalid: expected a string but got undefined`

**원인**: next-mdx-remote v5에서 App Router 사용 시 `serialize()` 함수 대신 RSC 방식 필요

**해결**:
```typescript
// Before (에러)
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
const mdxSource = await serialize(post.content);
<MDXContent source={mdxSource} />

// After (정상)
import { MDXRemote } from "next-mdx-remote/rsc";
<MDXContent source={post.content} />  // 문자열 직접 전달
```

---

## 배포 가이드

### Vercel 배포 단계
1. https://vercel.com 로그인
2. **Add New → Project**
3. **Import Git Repository**: `drtknoh-sudo/aidxmedia` 선택
4. **Framework Preset**: Next.js (자동 감지)
5. **Deploy** 클릭

### 배포 후 URL
- Production: `https://aidxmedia.vercel.app` (예상)
- 커스텀 도메인 설정 가능

---

## 향후 개선 사항

- [ ] 검색 기능 구현
- [ ] 태그 필터링 페이지
- [ ] 댓글 시스템 (예: Giscus)
- [ ] 뉴스레터 구독 연동
- [ ] 다크 모드 지원
- [ ] RSS 피드 생성
- [ ] SEO 메타태그 강화
- [ ] 이미지 최적화 (로컬 이미지 지원)

---

## 명령어 참고

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm start

# 린트 검사
npm run lint
```

---

*마지막 업데이트: 2026-01-28*
