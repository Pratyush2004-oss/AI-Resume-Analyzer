interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let badgeText = "";

  if (score > 70) {
    badgeColor = "bg-green-500 text-green-700";
    badgeText = "Strong";
  } else if (score > 50) {
    badgeColor = "bg-yellow-500 text-yellow-700";
    badgeText = "Good";
  } else {
    badgeColor = "bg-red-500 text-red-700";
    badgeText = "Need Work";
  }
  return (
    <div className={`px-2 py-1 md:px-3 rounded-full ${badgeColor}`}>
      <p className="text-xs md:text-sm font-black font-mono">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
