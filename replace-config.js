module.exports = {
  files: 'src/**/*.{tsx,ts}',
  from: [
    /rgba\(57,255,20,([0-9.]+)\)/g,
    /rgba\(57, 255, 20,([0-9.]+)\)/g,
    /#39ff14/g,
    /text-vote-neon/g,
    /border-vote-neon/g,
    /bg-vote-neon/g
  ],
  to: [
    'rgba(139,92,246,$1)',
    'rgba(139, 92, 246,$1)',
    '#8B5CF6',
    'text-vote-neon',
    'border-vote-neon',
    'bg-vote-neon'
  ],
  countMatches: true,
}; 