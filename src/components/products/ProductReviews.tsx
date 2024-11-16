import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewForm } from "./ReviewForm";

interface Review {
  rating: number;
  comment: string;
  author?: string;
  date?: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
}

export const ProductReviews = ({ productId, reviews }: ProductReviewsProps) => {
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Customer Reviews
            <span className="text-sm font-normal text-muted-foreground">
              ({averageRating.toFixed(1)}/5)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-luxury-gold text-luxury-gold"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {review.comment}
                </p>
                {review.author && (
                  <p className="text-xs text-muted-foreground">
                    By {review.author}
                    {review.date && ` on ${new Date(review.date).toLocaleDateString()}`}
                  </p>
                )}
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <ReviewForm productId={productId} />
    </div>
  );
};