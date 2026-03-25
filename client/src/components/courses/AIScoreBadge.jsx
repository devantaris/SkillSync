export default function AIScoreBadge({ score }) {
  let colorClass = 'tag-red';
  if (score >= 80) colorClass = 'tag-green';
  else if (score >= 60) colorClass = 'tag-amber';

  return (
    <span className={`${colorClass} gap-1`}>
      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1l2.47 5.01L16 6.74l-4 3.9.94 5.5L8 13.47l-4.94 2.67.94-5.5-4-3.9 5.53-.73z" />
      </svg>
      AI: {score}
    </span>
  );
}
