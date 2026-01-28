import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research - Science Journal",
  description: "최신 연구 논문과 과학적 발견을 확인하세요",
};

export default function ResearchPage() {
  const posts = getAllPosts("research");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b-4 border-accent-blue pb-4 mb-8">
        <h1 className="text-4xl font-serif font-bold">Research</h1>
        <p className="text-gray-600 mt-2">최신 연구 논문과 과학적 발견</p>
      </div>

      {/* Articles Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">아직 등록된 연구 논문이 없습니다.</p>
          <p className="text-gray-400">
            <code className="bg-gray-100 px-2 py-1 rounded">src/content/research/</code> 폴더에
            MDX 파일을 추가하여 연구 논문을 작성하세요.
          </p>
        </div>
      )}
    </div>
  );
}
