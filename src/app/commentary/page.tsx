import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commentary - Science Journal",
  description: "과학에 대한 전문가 논평과 의견을 확인하세요",
};

export default function CommentaryPage() {
  const posts = getAllPosts("commentary");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b-4 border-accent-green pb-4 mb-8">
        <h1 className="text-4xl font-serif font-bold">Commentary</h1>
        <p className="text-gray-600 mt-2">과학에 대한 전문가 논평과 의견</p>
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
          <p className="text-gray-500 text-lg mb-4">아직 등록된 논평이 없습니다.</p>
          <p className="text-gray-400">
            <code className="bg-gray-100 px-2 py-1 rounded">src/content/commentary/</code> 폴더에
            MDX 파일을 추가하여 논평을 작성하세요.
          </p>
        </div>
      )}
    </div>
  );
}
