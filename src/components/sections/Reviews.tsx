// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
// import { TbStarFilled, TbSend } from 'react-icons/tb'
// import { SectionHeading } from '@/components/ui/SectionHeading'
// import { GlowCard } from '@/components/ui/GlowCard'
// import { MagneticButton } from '@/components/ui/MagneticButton'
// import { reviews } from '@/data/reviews'
// import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'
// import { submitReview, ReviewSubmission } from '@/services/reviewService'

// function Stars({ rating }: { rating: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <TbStarFilled key={i} size={14} className={i < rating ? 'text-accent-cyan' : 'text-white/10'} />
//       ))}
//     </div>
//   )
// }

// export function Reviews() {
//   const [rating, setRating] = useState(5)
//   const [submitting, setSubmitting] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ReviewSubmission>()

//   const onSubmit = async (data: ReviewSubmission) => {
//     setSubmitting(true)
//     try {
//       await submitReview({ ...data, rating })
//       toast.success('Thanks for your review!')
//       reset()
//       setRating(5)
//     } catch {
//       toast.error('Something went wrong. Please try again.')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <section id="reviews" className="container-section py-28">
//       <SectionHeading
//         eyebrow="Reviews"
//         title="What clients say"
//         description="Real feedback from people I've worked with."
//       />

//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={viewportOnce}
//         variants={staggerContainer}
//         className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-16"
//       >
//         {reviews.map((review, i) => (
//           <motion.div key={review.id} custom={i} variants={fadeUp}>
//             <GlowCard className="h-full p-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary font-display text-sm font-semibold text-white">
//                   {review.name
//                     .split(' ')
//                     .map((n) => n[0])
//                     .join('')}
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-white">{review.name}</h4>
//                   <p className="text-xs text-gray-500">{review.country}</p>
//                 </div>
//                 <div className="ml-auto">
//                   <Stars rating={review.rating} />
//                 </div>
//               </div>
//               <p className="mt-4 text-sm leading-relaxed text-gray-400">&quot;{review.message}&quot;</p>
//             </GlowCard>
//           </motion.div>
//         ))}
//       </motion.div>

//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={viewportOnce}
//         variants={fadeUp}
//         className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-card p-8 backdrop-blur-md"
//       >
//         <h3 className="text-lg font-semibold text-white">Leave a review</h3>
//         <p className="mt-1 text-sm text-gray-400">Worked together? I&apos;d love to hear your feedback.</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
//           <div>
//             <input
//               {...register('name', { required: 'Name is required' })}
//               placeholder="Your name"
//               className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-violet/50"
//             />
//             {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
//           </div>

//           <div>
//             <span className="mb-2 block text-xs uppercase tracking-widest text-gray-500">Rating</span>
//             <div className="flex gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <button
//                   type="button"
//                   key={i}
//                   onClick={() => setRating(i + 1)}
//                   aria-label={`Rate ${i + 1} stars`}
//                   className="transition-transform hover:scale-110"
//                 >
//                   <TbStarFilled size={22} className={i < rating ? 'text-accent-cyan' : 'text-white/15'} />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <textarea
//               {...register('message', { required: 'A short message helps others', minLength: { value: 10, message: 'Please write a bit more' } })}
//               placeholder="Share your experience..."
//               rows={4}
//               className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-violet/50"
//             />
//             {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
//           </div>

//           <MagneticButton type="submit" variant="primary" className="w-full !justify-center" disabled={submitting}>
//             <TbSend size={16} /> {submitting ? 'Submitting...' : 'Submit Review'}
//           </MagneticButton>
//         </form>
//       </motion.div>
//     </section>
//   )
// }
