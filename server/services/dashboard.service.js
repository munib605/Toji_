import Project from '../models/Project.model.js'
import Review from '../models/Review.model.js'
import ContactMessage from '../models/ContactMessage.model.js'
import Skill from '../models/Skill.model.js'

export const dashboardService = {
  async getStats() {
    const [totalProjects, completedProjects, totalSkills, totalMessages, unreadMessages, reviewStats] =
      await Promise.all([
        Project.countDocuments(),
        Project.countDocuments({ status: 'published' }),
        Skill.countDocuments(),
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ isRead: false }),
        Review.getAverageRating(),
      ])

    // Distinct technologies across all projects, via aggregation.
    const techAgg = await Project.aggregate([
      { $unwind: '$technologies' },
      { $group: { _id: '$technologies' } },
      { $count: 'total' },
    ])

    return {
      totalProjects,
      completedProjects,
      totalTechnologies: techAgg[0]?.total || 0,
      totalSkills,
      totalMessages,
      unreadMessages,
      totalReviews: reviewStats.count,
      averageRating: reviewStats.average,
      // Future-ready: populate once a visits-tracking collection exists.
      totalVisitors: 0,
    }
  },
}

export default dashboardService
