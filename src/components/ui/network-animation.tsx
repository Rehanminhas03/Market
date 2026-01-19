"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originalVx: number;
  originalVy: number;
}

interface NetworkAnimationProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  nodeColor?: string;
  lineColor?: string;
  interactive?: boolean;
  mouseInfluenceRadius?: number;
  mouseInfluenceStrength?: number;
  speed?: number;
}

export default function NetworkAnimation({
  className = "",
  nodeCount = 40,
  connectionDistance = 150,
  nodeColor = "rgba(180, 145, 70, 0.8)",
  lineColor = "rgba(180, 145, 70, 0.15)",
  interactive = true,
  mouseInfluenceRadius = 200,
  mouseInfluenceStrength = 0.02,
  speed = 1,
}: NetworkAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isInside: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        isInside: true,
      };
    };

    const handleTouchEnd = () => {
      mouseRef.current.isInside = false;
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("touchend", handleTouchEnd);
    }

    // Initialize nodes with speed multiplier for more movement
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
      const vx = (Math.random() - 0.5) * 0.8 * speed;
      const vy = (Math.random() - 0.5) * 0.8 * speed;
      return {
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx,
        vy,
        originalVx: vx,
        originalVy: vy,
        size: Math.random() * 2 + 1,
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update node positions
      nodes.forEach((node) => {
        // Mouse interaction - nodes are attracted/repelled by cursor
        if (interactive && mouse.isInside) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluenceRadius && distance > 0) {
            // Normalize and apply influence (gentle attraction)
            const force = (1 - distance / mouseInfluenceRadius) * mouseInfluenceStrength;
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
          }
        }

        // Apply some friction to prevent infinite acceleration
        node.vx *= 0.995;
        node.vy *= 0.995;

        // Ensure minimum movement - nodes should always be drifting
        const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const minSpeed = 0.3 * speed;
        if (currentSpeed < minSpeed) {
          node.vx = node.originalVx * 0.8;
          node.vy = node.originalVy * 0.8;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > dimensions.width) {
          node.vx *= -1;
          node.originalVx *= -1;
        }
        if (node.y < 0 || node.y > dimensions.height) {
          node.vy *= -1;
          node.originalVy *= -1;
        }

        // Keep within bounds
        node.x = Math.max(0, Math.min(dimensions.width, node.x));
        node.y = Math.max(0, Math.min(dimensions.height, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor.replace("0.15", (0.15 * opacity).toFixed(2));
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw connection to mouse when nearby
      if (interactive && mouse.isInside) {
        nodes.forEach((node) => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluenceRadius) {
            const opacity = (1 - distance / mouseInfluenceRadius) * 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(180, 145, 70, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.size * 3
        );
        gradient.addColorStop(0, "rgba(180, 145, 70, 0.3)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw mouse glow when inside
      if (interactive && mouse.isInside) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseInfluenceRadius * 0.5
        );
        gradient.addColorStop(0, "rgba(180, 145, 70, 0.15)");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseInfluenceRadius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [dimensions, nodeCount, connectionDistance, nodeColor, lineColor, interactive, mouseInfluenceRadius, mouseInfluenceStrength, speed]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ cursor: interactive ? "default" : "inherit" }}
      />
    </motion.div>
  );
}
