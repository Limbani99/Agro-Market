import React, { useState } from "react";
import { useData } from "../context/DataProvider";
import { Star, MessageSquare, CornerDownRight, Send } from "lucide-react";

export default function Reviews() {
  const { reviews, addReviewReply } = useData();
  const [replyTexts, setReplyTexts] = useState({});

  const handleReplySubmit = (reviewId) => {
    const text = replyTexts[reviewId];
    if (!text || !text.trim()) return;
    addReviewReply(reviewId, text);
    setReplyTexts({ ...replyTexts, [reviewId]: "" });
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const getRatingStats = (stars) => {
    if (totalReviews === 0) return { count: 0, percentage: 0 };
    const count = reviews.filter(r => Math.round(r.rating) === stars).length;
    const percentage = Math.round((count / totalReviews) * 100);
    return { count, percentage };
  };

  const roundedAverage = Math.round(Number(averageRating));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Customer Reviews</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Audit and reply to feedback submitted by buyer accounts.</p>
      </div>

      {/* Aggregate star metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white p-6 flex flex-col items-center justify-center text-center rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Average Rating</p>
          <h3 className="font-serif text-4xl font-bold text-slate-800 mt-2">{averageRating}</h3>
          <div className="flex text-amber-500 mt-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${
                  i < roundedAverage ? "fill-current text-amber-500" : "text-slate-200"
                }`} 
              />
            ))}
          </div>
          <p className="text-[11px] font-semibold text-slate-400 mt-3">From {totalReviews} dynamic transaction reviews</p>
        </div>

        {/* Rating bars */}
        <div className="col-span-2 card bg-white p-6 flex flex-col justify-between rounded-[2rem] border border-slate-100 shadow-sm">
          <h4 className="font-serif text-[15px] font-bold text-slate-800 border-b border-slate-100 pb-3 mb-2">Rating Distribution</h4>
          <div className="flex flex-col gap-2.5 text-[12.5px] font-bold text-slate-600">
            {[5, 4, 3, 2, 1].map((stars) => {
              const { percentage } = getRatingStats(stars);
              const isZero = percentage === 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-12 text-slate-500">{stars} Star</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }} 
                    />
                  </div>
                  <span className={`w-8 text-right ${isZero ? "text-slate-300" : "text-slate-400"}`}>
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* Reviews feed */}
      <div className="card bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-6">Grower Feedback Log</h3>
        
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium flex flex-col items-center justify-center gap-3">
            <MessageSquare className="w-10 h-10 text-slate-300" />
            <p>No feedback responses registered yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col gap-3">
                {/* Reviewer Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-bold text-slate-800">{rev.author}</span>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-current text-amber-500" : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">Purchased: {rev.product}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 font-display">{rev.date}</span>
                </div>

                {/* Comment text */}
                <p className="text-[13px] text-slate-500 italic font-medium leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Sub-reply block */}
                {rev.reply ? (
                  <div className="flex gap-2.5 bg-white border border-slate-100 p-3.5 rounded-xl ml-4 mt-1">
                    <CornerDownRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wide">Grower Response</p>
                      <p className="text-[12.5px] text-slate-600 mt-0.5 leading-relaxed font-semibold">
                        {rev.reply}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="ml-4 mt-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type a grower reply to this feedback..."
                        className="w-full pl-4 pr-10 py-2.5 text-[13px] border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white font-medium shadow-xs"
                        value={replyTexts[rev.id] || ""}
                        onChange={(e) =>
                          setReplyTexts({ ...replyTexts, [rev.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleReplySubmit(rev.id);
                        }}
                      />
                      <button
                        onClick={() => handleReplySubmit(rev.id)}
                        className="p-1.5 text-primary hover:text-primary-dark absolute right-2 top-1/2 -translate-y-1/2 rounded-md transition-colors"
                        title="Post Reply"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


