import React from 'react'

const StudyTips: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-secondary-900 dark:text-black mb-6">
        Study Tips
      </h1>
      <p className="text-lg text-secondary-600 dark:text-black mb-8">
        Learn how to study more efficiently and retain information better with these proven techniques.
      </p>

      <div className="space-y-8">
        {/* Active Learning */}
        <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
              <i className="bi bi-lightbulb text-xl text-blue-600 dark:text-blue-300"></i>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Active Learning Techniques
            </h2>
          </div>
          <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Summarize in your own words:</strong> After reading a section, explain it out loud as if teaching someone else.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Ask questions:</strong> Constantly ask "why" and "how" to deepen understanding.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Connect to existing knowledge:</strong> Link new concepts to what you already know.</span>
            </li>
          </ul>
        </div>

        {/* Time Management */}
        <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mr-4">
              <i className="bi bi-clock text-xl text-green-600 dark:text-green-300"></i>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Time Management
            </h2>
          </div>
          <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Pomodoro Technique:</strong> Study for 25 minutes, then take a 5-minute break.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Time blocking:</strong> Schedule specific study times in your calendar.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Priority tasks:</strong> Tackle difficult material when you're most alert.</span>
            </li>
          </ul>
        </div>

        {/* Memory Techniques */}
        <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-4">
              <i className="bi bi-brain text-xl text-purple-600 dark:text-purple-300"></i>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Memory Enhancement
            </h2>
          </div>
          <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Spaced repetition:</strong> Review material at increasing intervals.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Mnemonics:</strong> Create acronyms or visual associations to remember facts.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Visual learning:</strong> Create mind maps, diagrams, and charts.</span>
            </li>
          </ul>
        </div>

        {/* Environment */}
        <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mr-4">
              <i className="bi bi-house text-xl text-yellow-600 dark:text-yellow-300"></i>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Study Environment
            </h2>
          </div>
          <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Minimize distractions:</strong> Turn off notifications and find a quiet space.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Good lighting:</strong> Ensure proper lighting to reduce eye strain.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Comfortable setup:</strong> Use ergonomic furniture and maintain good posture.</span>
            </li>
          </ul>
        </div>

        {/* Spiritual Study */}
        <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mr-4">
              <i className="bi bi-book text-xl text-indigo-600 dark:text-indigo-300"></i>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Spiritual Study Tips
            </h2>
          </div>
          <ul className="space-y-3 text-secondary-600 dark:text-secondary-400">
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Prayer before study:</strong> Begin with prayer for understanding and wisdom.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Meditate on scripture:</strong> Take time to reflect deeply on++.on verses.</span>
            </li>
            <li className="flex items-start">
              <i className="bi bi-check-circle text-green-500 dark:text-green-400 mr-2 mt-1"></i>
              <span><strong>Apply to life:</strong> Think about how to apply teachings to daily situations.</span>
            </li>
          </ul>
        </div>

        {/* Quick Tips */}
        <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mr-4">
              <i className="bi bi-lightning text-xl text-orange-600 dark:text-orange-300"></i>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Quick Study Tips
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <i className="bi bi-cup-hot text-primary-600 dark:text-primary-300"></i>
              <span className="text-primary-800 dark:text-primary-100">Stay hydrated during study sessions</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="bi bi-moon text-primary-600 dark:text-primary-300"></i>
              <span className="text-primary-800 dark:text-primary-100">Get adequate sleep for better retention</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="bi bi-pencil text-primary-600 dark:text-primary-300"></i>
              <span className="text-primary-800 dark:text-primary-100">Take handwritten notes for better memory</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="bi bi-people text-primary-600 dark:text-primary-300"></i>
              <span className="text-primary-800 dark:text-primary-100">Study with others for different perspectives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyTips
