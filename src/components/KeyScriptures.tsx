import React from 'react'

const KeyScriptures: React.FC = () => {
  const scriptures = [
    {
      reference: 'Proverbs 4:7',
      text: 'Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.'
    },
    {
      reference: 'James 1:5',
      text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.'
    },
    {
      reference: 'Isaiah 1:19',
      text: 'If ye be willing and obedient, ye shall eat the good of the land.'
    },
    {
      reference: 'Psalm 25:9',
      text: 'The meek will he guide in judgment: and the meek will he teach his way.'
    }
  ]

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4">
      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Key Scriptures</h3>
      
      <div className="space-y-4">
        {scriptures.map((scripture, index) => (
          <div key={index} className="border-l-2 border-primary-200 dark:border-primary-700 pl-3">
            <div className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1">
              {scripture.reference}:
            </div>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">
              "{scripture.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KeyScriptures
