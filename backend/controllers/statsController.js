const Inquiry = require('../models/Inquiry');
const Survey = require('../models/Survey');
const User = require('../models/User');

/**
 * GET /api/stats
 * Admin only — live dashboard statistics
 */
const getStats = async (req, res) => {
  try {
    const [totalInquiries, totalSurveys, totalAgents] = await Promise.all([
      Inquiry.countDocuments(),
      Survey.countDocuments(),
      User.countDocuments({ role: 'agent' }),
    ]);

    const statusCounts = await Inquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statusMap = {};
    statusCounts.forEach((s) => { statusMap[s._id] = s.count; });

    const pending = (statusMap['new'] || 0) + (statusMap['pending'] || 0);
    const completed = (statusMap['approved'] || 0) + (statusMap['closed'] || 0);
    const followUp = statusMap['follow-up'] || 0;

    // Monthly breakdown for the chart (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyData = await Inquiry.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          total: { $sum: 1 },
          closed: {
            $sum: {
              $cond: [{ $in: ['$status', ['approved', 'closed']] }, 1, 0],
            },
          },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = monthlyData.map((m) => ({
      month: monthNames[m._id.month - 1],
      inquiries: m.total,
      closed: m.closed,
    }));

    // Top destinations
    const destinationData = await Inquiry.aggregate([
      { $group: { _id: '$destination', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const totalDestCount = destinationData.reduce((s, d) => s + d.count, 0) || 1;
    const destinationStats = destinationData.map((d) => ({
      name: d._id?.split(',')[0] || d._id,
      value: Math.round((d.count / totalDestCount) * 100),
    }));

    res.status(200).json({
      success: true,
      stats: {
        totalInquiries,
        totalSurveys,
        totalAgents,
        pending,
        completed,
        followUp,
        activeInquiries: pending + followUp,
      },
      chartData,
      destinationStats,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching stats.', error: error.message });
  }
};

module.exports = { getStats };
