import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/websiteData';
import { BookOpen, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 md:py-28 bg-[#F4F6F9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#2A6EB4]/10 text-[#2A6EB4] border border-[#2A6EB4]/30 uppercase tracking-wider font-poppins">
            <BookOpen className="w-3.5 h-3.5 text-[#2A6EB4]" />
            <span>Perspectives & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Latest Articles & Engineering Codex
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Thought leadership on the future of programming, human-AI symbiosis, and building software ventures from Haripur.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-3">
                {/* Meta */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="font-bold text-[#F38A32] uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-base text-[#1E2A4F] group-hover:text-[#2A6EB4] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom bar */}
              <div className="p-6 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between text-xs pt-4">
                <span className="text-[11px] text-slate-400">
                  {post.date}
                </span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-bold text-[#2A6EB4] hover:text-[#1E2A4F] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Lightbox Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-[#1E2A4F]/70 backdrop-blur-sm"
            />
            <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 space-y-6 my-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-[#F38A32] uppercase tracking-wider font-poppins">
                  {selectedPost.category}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 text-slate-400 hover:text-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-poppins text-[#1E2A4F] leading-tight">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <User className="w-3.5 h-3.5 text-[#2A6EB4]" />
                    <span>{selectedPost.author}</span>
                  </span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{selectedPost.content}</p>
                <p className="bg-[#F4F6F9] p-4 rounded-xl border border-slate-200 text-xs italic text-slate-600">
                  "At SOCH – Vibe Coding, we combine human understanding, system design, and AI tooling to prepare students for the highest echelon of software engineering."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white rounded-xl text-xs font-semibold transition"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
