// weeklyChartService.js
import api from '@/services/api'

export async function getWeeklyData() {
    try {
        const response = await api.get('/weeklyChart') // asegúrate que esté definido en tu db.json
        return response.data
    } catch (error) {
        console.error('Error fetching weekly chart data:', error)
        return []
    }
}
