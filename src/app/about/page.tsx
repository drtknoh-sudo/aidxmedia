import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Science Journal",
  description: "Science Journal에 대해 알아보세요",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-serif font-bold mb-8">About Science Journal</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          Science Journal은 최신 과학 뉴스, 연구 논문, 그리고 전문가 논평을 제공하는 플랫폼입니다.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-10 mb-4">Our Mission</h2>
        <p>
          우리의 목표는 복잡한 과학적 발견을 일반 대중이 이해할 수 있는 형태로 전달하는 것입니다.
          과학의 진보가 우리 모두의 삶에 미치는 영향을 알리고, 과학적 사고를 촉진하는 것이
          우리의 사명입니다.
        </p>

        <h2 className="text-2xl font-serif font-bold mt-10 mb-4">What We Cover</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>News</strong> - 과학계의 최신 소식과 발견</li>
          <li><strong>Research</strong> - 심층적인 연구 논문 리뷰와 분석</li>
          <li><strong>Commentary</strong> - 과학 정책과 윤리에 대한 전문가 의견</li>
        </ul>

        <h2 className="text-2xl font-serif font-bold mt-10 mb-4">기사 작성 방법</h2>
        <p>
          이 웹사이트는 MDX 파일 기반으로 콘텐츠를 관리합니다.
          새로운 기사를 작성하려면 아래 폴더에 <code>.mdx</code> 파일을 추가하세요:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><code>src/content/news/</code> - 뉴스 기사</li>
          <li><code>src/content/research/</code> - 연구 논문</li>
          <li><code>src/content/commentary/</code> - 논평</li>
        </ul>

        <h3 className="text-xl font-serif font-semibold mt-8 mb-3">MDX 파일 형식</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`---
title: "기사 제목"
description: "기사 요약"
date: "2026-01-28"
author: "작성자 이름"
authorRole: "소속/직책"
category: "news"
tags: ["태그1", "태그2"]
image: "https://example.com/image.jpg"
featured: true
---

기사 내용을 마크다운으로 작성하세요.

## 소제목

본문 내용...`}
        </pre>

        <h2 className="text-2xl font-serif font-bold mt-10 mb-4">Contact</h2>
        <p>
          기사 투고, 문의사항, 또는 피드백이 있으시면 언제든 연락해 주세요.
        </p>
        <p className="mt-2">
          <a href="mailto:contact@sciencejournal.com" className="text-primary hover:text-primary-dark">
            contact@sciencejournal.com
          </a>
        </p>
      </div>
    </div>
  );
}
