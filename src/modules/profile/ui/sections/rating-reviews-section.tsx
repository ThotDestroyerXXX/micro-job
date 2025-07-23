import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import NotFound from "@/components/not-found";

export default function RatingReviewsSection({
  profileData,
}: Readonly<{
  profileData: {
    rating: number;
    totalReviews: number;
    reviews: string[] | null;
  };
}>) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Star className='h-5 w-5 text-yellow-500' />
            Ratings & Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-6 mb-6'>
            <div className='text-center'>
              <div className='text-3xl font-bold'>
                {profileData.rating ?? 4}
              </div>
              <div className='flex items-center justify-center gap-1 mb-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(profileData.rating)
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className='text-sm text-muted-foreground'>
                {profileData.totalReviews === 0
                  ? "no"
                  : profileData.totalReviews}{" "}
                reviews
              </div>
            </div>

            <div className='flex-1'>
              <div className='space-y-2'>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className='flex items-center gap-2'>
                    <span className='text-sm w-8'>{stars}★</span>
                    <div className='flex-1 bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-yellow-500 h-2 rounded-full'
                        style={{
                          width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                        }}
                      ></div>
                    </div>
                    <span className='text-sm text-muted-foreground w-8'>
                      {stars === 5
                        ? 89
                        : stars === 4
                          ? 25
                          : stars === 3
                            ? 8
                            : stars === 2
                              ? 3
                              : 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            {/* {profileData.reviews ? (
              profileData.reviews.map((review) => (
                <div key={review.id} className='border-b pb-4 last:border-b-0'>
                  <div className='flex items-start gap-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.reviewer}
                      />
                      <AvatarFallback>
                        {review.reviewer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-medium'>{review.reviewer}</span>
                        <div className='flex items-center'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className='text-gray-600 mb-2'>{review.text}</p>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <span>{review.jobTitle}</span>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : ( */}
            <NotFound message='No reviews yet.' />
            {/* )} */}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
