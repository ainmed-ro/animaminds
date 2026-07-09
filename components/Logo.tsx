"use client";

import React from "react";

interface LogoProps {
  showSlogan?: boolean;
  layout?: "vertical" | "horizontal";
  className?: string;
}

const GOLD = "#C9A87C";
const DARK_GREEN = "#3E5C45";
const SAGE = "#7C9A7E";
const EMBLEM_BG = "#E8EFEA";

interface Point {
  x: number;
  y: number;
}

function quadraticPoint(t: number, p0: Point, p1: Point, p2: Point): Point {
  const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
  const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
  return { x, y };
}

function leafAngle(t: number, p0: Point, p1: Point, p2: Point): number {
  const dt = 0.008;
  const pA = quadraticPoint(Math.max(0, t - dt), p0, p1, p2);
  const pB = quadraticPoint(Math.min(1, t + dt), p0, p1, p2);
  return (Math.atan2(pB.y - pA.y, pB.x - pA.x) * 180) / Math.PI;
}

function Emblem({ size = 80 }: { size?: number }) {
  const view = size;
  const cx = view / 2;
  const cy = view / 2;

  const leftBranch: { p0: Point; p1: Point; p2: Point } = {
    p0: { x: cx, y: view * 0.88 },
    p1: { x: cx - view * 0.42, y: view * 0.62 },
    p2: { x: cx - view * 0.16, y: view * 0.16 },
  };

  const rightBranch: { p0: Point; p1: Point; p2: Point } = {
    p0: { x: cx, y: view * 0.88 },
    p1: { x: cx + view * 0.42, y: view * 0.62 },
    p2: { x: cx + view * 0.16, y: view * 0.16 },
  };

  const leavesPerBranch = 10;
  const leftLeaves = Array.from({ length: leavesPerBranch }).map((_, i) => {
    const t = 0.1 + (i / (leavesPerBranch - 1)) * 0.8;
    const pos = quadraticPoint(t, leftBranch.p0, leftBranch.p1, leftBranch.p2);
    const angle = leafAngle(t, leftBranch.p0, leftBranch.p1, leftBranch.p2) + 92;
    return { ...pos, angle, key: `l${i}` };
  });

  const rightLeaves = Array.from({ length: leavesPerBranch }).map((_, i) => {
    const t = 0.1 + (i / (leavesPerBranch - 1)) * 0.8;
    const pos = quadraticPoint(t, rightBranch.p0, rightBranch.p1, rightBranch.p2);
    const angle = leafAngle(t, rightBranch.p0, rightBranch.p1, rightBranch.p2) - 92;
    return { ...pos, angle, key: `r${i}` };
  });

  const allLeaves = [...leftLeaves, ...rightLeaves];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${view} ${view}`}
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={view * 0.42} fill={EMBLEM_BG} />
      {allLeaves.map((leaf) => (
        <ellipse
          key={leaf.key}
          cx={leaf.x}
          cy={leaf.y}
          rx={view * 0.026}
          ry={view * 0.072}
          fill={GOLD}
          transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
        />
      ))}
      <text
        x={cx}
        y={cy + view * 0.06}
        textAnchor="middle"
        fill={GOLD}
        fontFamily="'Playfair Display', serif"
        fontSize={view * 0.34}
        fontWeight={600}
        letterSpacing="-0.02em"
      >
        AM
      </text>
    </svg>
  );
}

export default function Logo({
  showSlogan = false,
  layout = "horizontal",
  className = "",
}: LogoProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={`flex items-center ${
        isHorizontal ? "flex-row gap-3" : "flex-col gap-2"
      } ${className}`}
    >
      <Emblem size={isHorizontal ? 72 : 96} />
      <div
        className={`flex flex-col ${
          isHorizontal ? "items-start" : "items-center"
        }`}
      >
        <span
          className="font-display font-semibold tracking-tight"
          style={{
            color: DARK_GREEN,
            fontSize: isHorizontal ? "1.65rem" : "1.85rem",
            lineHeight: 1.1,
          }}
        >
          AnimaMinds
        </span>
        {showSlogan && (
          <span
            className="font-medium uppercase"
            style={{
              color: SAGE,
              fontSize: isHorizontal ? "0.55rem" : "0.6rem",
              letterSpacing: "0.14em",
            }}
          >
            Where people and ideas grow together
          </span>
        )}
      </div>
    </div>
  );
}
