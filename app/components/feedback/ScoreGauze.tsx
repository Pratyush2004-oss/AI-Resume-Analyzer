import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({
  score = 75,
  textColor,
  shrink,
}: {
  score: number;
  textColor?: string;
  shrink?: boolean;
}) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${shrink ? "w-24 h-12" : "w-40 h-20 "}`}>
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={shrink ? 7 : 9}
            strokeLinecap="round"
          />

          {/* Foreground arc with rounded ends */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={ shrink ? 7 : 9}
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div
            className={`${
              shrink ? "text-base" : "text-xl"
            }  font-semibold pt-4`}
          >
            <span className={textColor}>{score}</span>/100
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
