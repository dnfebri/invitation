import type { Variants } from "framer-motion";
import { motion, sync, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import React, { useRef } from "react";
import { MenuToggle } from "./MenuToggle";
import { BiHomeHeart } from "react-icons/bi";
import { MdRateReview, MdStreetview } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const sidebar: Variants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variantsMenu: Variants = {
    open: {
      opacity: 1,
      rotate: 360,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: 0,
      opacity: 0,
      rotate: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={`absolute w-80 bg-red-500`} variants={sidebar} />
      <motion.div
        variants={variants}
        className="absolute left-3 top-3 sm:left-5"
      >
        <div className="relative">
          <motion.p
            variants={{
              open: { ...variantsMenu.open, y: 0, x: 90 },
              closed: { ...variantsMenu.closed },
            }}
            className={`absolute p-2 text-3xl rounded-full shadow-xl cursor-pointer hover:bg-primary`}
            onClick={() => {
              toggleOpen();
              setTimeout(() => {
                router.push("/admin");
              }, 500);
            }}
          >
            <BiHomeHeart />
          </motion.p>
          <motion.p
            variants={{
              open: { ...variantsMenu.open, y: 60, x: 60 },
              closed: { ...variantsMenu.closed },
            }}
            className={`absolute p-2 text-3xl rounded-full shadow-xl cursor-pointer hover:bg-blue-300`}
            onClick={() => {
              toggleOpen();
              setTimeout(() => {
                router.push("/admin/seen");
              }, 500);
            }}
          >
            <MdStreetview />
          </motion.p>
          <motion.p
            variants={{
              open: { ...variantsMenu.open, y: 90, x: 0 },
              closed: { ...variantsMenu.closed },
            }}
            className={`absolute p-2 text-3xl rounded-full shadow-xl cursor-pointer hover:bg-accent`}
            onClick={() => {
              toggleOpen();
              setTimeout(() => {
                router.push("/admin/test");
              }, 500);
            }}
          >
            <MdRateReview />
          </motion.p>
        </div>
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

const itemIds = [0, 1, 2, 3, 4];
