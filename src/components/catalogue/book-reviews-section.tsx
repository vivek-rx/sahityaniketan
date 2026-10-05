"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, User, Send, CheckCircle2, ThumbsUp, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { getBookReviews, createBookReview } from "@/lib/actions/books";
import { MotionSubmitButton } from "@/components/ui/motion-submit-button";

interface ReviewItem {
  id: string;
  reviewer_name: string;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
}

interface BookReviewsSectionProps {
  bookId: string;
  bookTitle: string;
}

const SAMPLE_REVIEWS: ReviewItem[] = [
  {
    id: "r-1",
    reviewer_name: "प्रा. अनंत देशपांडे (मराठी अभ्यासक)",
    rating: 5,
    title: "मराठी साहित्यातील अमूल्य ठेवा!",
    comment: "साहित्य निकेतन ग्रंथालयात हे पुस्तक उपलब्ध असणे हे अंबाजोगाईच्या वाचकांसाठी मोठे भाग्य आहे. भाषेची समृद्धी आणि मानवी भावनांचे उत्कृष्ट चित्रण.",
    created_at: "२०२६-०८-०१",
  },
  {
    id: "r-2",
    reviewer_name: "सुप्रिया कुलकर्णी (स्पर्धा परीक्षा अभ्यासू)",
    rating: 5,
    title: "अतिशय बोधप्रद व वाचन समृद्ध करणारे पुस्तक",
    comment: "वाचताना प्रत्येक पानावरील विचार मनाला स्पर्श करतात. अभ्यासिकेत हे पुस्तक शांततेत वाचण्याचा अनुभव अप्रतिम होता.",
    created_at: "२०२६-०७-२५",
  },
];

export function BookReviewsSection({ bookId, bookTitle }: BookReviewsSectionProps) {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState<ReviewItem[]>(SAMPLE_REVIEWS);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getBookReviews(bookId);
        if (data && data.length > 0) {
          const mapped: ReviewItem[] = data.map((r: any, idx: number) => ({
            id: r.id || `db-r-${idx}`,
            reviewer_name: r.reviewer_name || "ग्रंथालय वाचक",
            rating: r.rating || 5,
            title: r.title || "वाचक अभिप्राय",
            comment: r.comment || "",
            created_at: r.created_at ? new Date(r.created_at).toLocaleDateString("mr-IN") : "ताजा अभिप्राय",
          }));
          setReviews([...mapped, ...SAMPLE_REVIEWS]);
        }
      } catch (err) {
        console.error("Failed to load book reviews", err);
      }
    }
    loadReviews();
  }, [bookId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setSubmitting(true);
    try {
      const newReview = {
        book_id: bookId,
        reviewer_name: name.trim(),
        rating: userRating,
        title: title.trim() || "वाचक अभिप्राय",
        comment: comment.trim(),
      };

      await createBookReview(newReview);

      const addedItem: ReviewItem = {
        id: `rev-${Date.now()}`,
        reviewer_name: name.trim(),
        rating: userRating,
        title: title.trim() || "वाचक अभिप्राय",
        comment: comment.trim(),
        created_at: new Date().toLocaleDateString("mr-IN"),
      };

      setReviews((prev) => [addedItem, ...prev]);
      setSubmitted(true);
      setName("");
      setTitle("");
      setComment("");
    } catch (err) {
      console.error("Error submitting review", err);
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="bg-white dark:bg-[#220508] rounded-3xl border border-gray-200 dark:border-[#4A1217] p-6 md:p-8 shadow-xs font-marathi-body space-y-8 transition-colors">
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-100 dark:border-[#4A1217] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#991B1B] dark:text-[#E5B869] uppercase tracking-wider mb-1">
            <MessageSquare className="h-4 w-4 text-[#C0392B] dark:text-[#F89B5C]" />
            <span>वाचक अभिप्राय व पुनरावलोकन</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
            {bookTitle} — वाचक रेटिंग व प्रतिक्रिया
          </h3>
        </div>

        {/* Big Rating Badge */}
        <div className="flex items-center gap-4 bg-[#FAF9F6] dark:bg-[#1B0406] p-4 rounded-2xl border border-[#E8E2D6] dark:border-[#4A1217]">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-[#FAF2E8] font-mono">
              {avgRating}
            </span>
            <span className="text-xs text-gray-500 dark:text-[#B8A699] block">/ ५.० रेटिंग</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(Number(avgRating))
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300 dark:text-[#5A141A]"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-[#D5C2B4] font-medium">
              {reviews.length} नोंदणीकृत वाचकांची मते
            </p>
          </div>
        </div>
      </div>

      {/* Review Submission Form */}
      <div className="bg-[#FAF9F6] dark:bg-[#180305] p-6 rounded-2xl border border-[#E8E2D6] dark:border-[#4A1217]">
        <h4 className="text-base font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-[#ED6923] dark:text-[#F89B5C]" />
          <span>तुमचा अभिप्राय नोंदवा</span>
        </h4>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 text-xs font-bold"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <span>तुमचा अभिप्राय यशस्वीरित्या प्रकाशित झाला आहे. धन्यवाद!</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Interactive Star Rating Selector */}
            <div>
              <label className="block text-xs font-extrabold text-gray-700 dark:text-[#FAF2E8] mb-1.5">
                स्टार रेटिंग निवडा (Your Rating) *
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                    className="p-1 transition-transform hover:scale-125 cursor-pointer"
                  >
                    <Star
                      className={`h-6 w-6 transition-colors ${
                        star <= (hoverRating || userRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-[#5A141A]"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-2">
                  {userRating} / 5 स्टार
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-gray-700 dark:text-[#FAF2E8] mb-1">
                  तुमचे नाव (Your Name) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल जोशी"
                  className="w-full rounded-xl border border-stone-300 dark:border-[#5A141A] bg-white dark:bg-[#220508] px-3.5 py-2.5 text-xs text-gray-900 dark:text-[#FAF2E8] placeholder:text-gray-400 dark:placeholder:text-[#9C887B] focus:border-[#991B1B] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 dark:text-[#FAF2E8] mb-1">
                  अभिप्रायाचे शीर्षक (Review Title)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="उदा. उत्कृष्ट मराठी अभिजात ग्रंथ"
                  className="w-full rounded-xl border border-stone-300 dark:border-[#5A141A] bg-white dark:bg-[#220508] px-3.5 py-2.5 text-xs text-gray-900 dark:text-[#FAF2E8] placeholder:text-gray-400 dark:placeholder:text-[#9C887B] focus:border-[#991B1B] dark:focus:border-[#E5B869] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 dark:text-[#FAF2E8] mb-1">
                तुमचे मत / पुनरावलोकन (Detailed Comments) *
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="या पुस्तकाबद्दल तुमचे मत टाइप करा..."
                className="w-full rounded-xl border border-stone-300 dark:border-[#5A141A] bg-white dark:bg-[#220508] p-3 text-xs text-gray-900 dark:text-[#FAF2E8] placeholder:text-gray-400 dark:placeholder:text-[#9C887B] focus:border-[#991B1B] dark:focus:border-[#E5B869] focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end">
              <MotionSubmitButton
                type="submit"
                disabled={submitting}
                isPending={submitting}
                isSuccess={submitted}
                label="अभिप्राय सबमिट करा (Submit Review)"
                pendingLabel="नोंदवत आहे... (Submitting...)"
                successLabel="अभिप्राय नोंदवला! धन्यवाद."
                variant="primary"
              />
            </div>
          </form>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
          वाचक प्रतिक्रिया ({reviews.length})
        </h4>

        <div className="space-y-3">
          {reviews.map((rev) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#1B0406] border border-stone-200 dark:border-[#4A1217] shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-[#38070C] text-[#991B1B] dark:text-[#E5B869] font-bold text-xs flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-body">
                      {rev.reviewer_name}
                    </h5>
                    <span className="text-[10px] text-gray-400 dark:text-[#B8A699] block">{rev.created_at}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${
                        s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-[#5A141A]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {rev.title && (
                <h6 className="text-xs font-bold text-gray-900 dark:text-[#FAF2E8] font-marathi-heading">
                  {rev.title}
                </h6>
              )}

              <p className="text-xs text-gray-600 dark:text-[#D5C2B4] leading-relaxed font-marathi-body">
                {rev.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
