import { CapsuleData } from "../types/physics";

// --- Core Configuration ---
const complete = 1513
const percentage = (window.innerWidth / complete)
export const canvasWidth = window.innerWidth - 10;
export const canvasHeight = 500 * percentage;
const padX = 20;
const padY = 20;
const fontSize = 50 * percentage; // Adjust this value as needed
const lineWidth = 4 * percentage;

// --- Theme Colors ---
export const colors = {
    red: "#FF6D4C",
    newlime: "#DDF695",
    purple: "#C67CFF",
    white: "#FFFFFF",
    black: "#000000",
    lightPurple: "#E1D4FF",
    yellow: "#FAE069",
    blue: "#A0BEFF"
};

// --- Shared Element Dimensions ---
// Using capsuleHeight as the standard height for most capsules and diameter for circles
export const capsuleHeight = 90 * percentage;
export const circleDiameter = capsuleHeight; // Circle diameter matches capsule height
const smallCapsuleHeight = 40 * percentage; // Specific height for r2c3c

// --- Row Y Coordinates ---
// Define base Y positions for each row to avoid repeating calculations
const row1Y = 80 * percentage;
const row2Y = (170 + padY) * percentage;
const row3Y = (260 + 2 * padY) * percentage;

// --- Initial Capsule Definitions ---
// Positions and dimensions are calculated directly inline using the original values/formulas
export const initialCapsules: CapsuleData[] = [
    // --- Row 1 ---
    {
        id: "r1c1",
        shape: "capsule",
        x: (100 + padX) * percentage, // Calculation inline
        y: row1Y,
        width: 220 * percentage,     // Specific width
        height: capsuleHeight * percentage,
        text: "QUIT",
        color: colors.red,
        textSize: fontSize,
        secondaryColor: colors.yellow,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
    },
    {
        id: "r1c2a",
        shape: "capsule",
        x: (290 + padX) * percentage, // Calculation inline
        y: row1Y,
        width: 150 * percentage,     // Specific width
        height: capsuleHeight * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.red,
    },
    {
        id: "r1c2b",
        shape: "circle",
        // X position calculated for circle center relative to its intended top-left spot
        x: ((367 + padX) + circleDiameter / 2) * percentage, // Calculation inline (original formula)
        y: row1Y, // Note: Physics engine might treat Y as center for circles
        width: circleDiameter * percentage, // Use diameter for width/height for consistency
        height: circleDiameter * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r1c3",
        shape: "capsule",
        x: (610 + (4 * padX)) * percentage, // Calculation inline
        y: row1Y,
        width: 410 * percentage,        // Specific width
        height: capsuleHeight * percentage,
        text: "DREAMING",
        color: colors.newlime,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.blue,
    },
    {
        id: "r1c4a",
        shape: "capsule",
        x: (880 + (5 * padX)) * percentage, // Calculation inline
        y: row1Y,
        width: 160 * percentage,        // Specific width
        height: capsuleHeight * percentage,
        text: "",
        color: colors.red,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r1c4b",
        shape: "circle",
        // X position calculated for circle center relative to its intended top-left spot
        x: ((922 + (7 * padX)) + circleDiameter / 2) * percentage, // Calculation inline (original formula)
        y: row1Y, // Note: Physics engine might treat Y as center for circles
        width: circleDiameter * percentage,
        height: circleDiameter * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r1c5",
        shape: "capsule",
        x: (1085 + (11 * padX)) * percentage, // Calculation inline (5*padX + 6*padX)
        y: row1Y,
        width: 290 * percentage,          // Specific width
        height: capsuleHeight * percentage,
        text: "ABOUT",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.red,
    },

    // --- Row 2 ---
    {
        id: "r2c1a",
        shape: "capsule",
        x: 95 * percentage, // Direct value from original
        y: row2Y,
        width: 170 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "",
        color: colors.purple,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r2c1b",
        shape: "circle",
        // X position calculated for circle center relative to its intended top-left spot
        x: ((162 + padX) + circleDiameter / 2) * percentage, // Calculation inline (original formula)
        y: row2Y, // Note: Physics engine might treat Y as center for circles
        width: circleDiameter * percentage,
        height: circleDiameter * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r2c2",
        shape: "capsule",
        x: 410 * percentage, // Direct value from original
        y: row2Y,
        width: 255 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "YOUR",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.red,
    },
    { // Corrected ID from r2c1a to r2c3a
        id: "r2c3a",
        shape: "capsule",
        x: 630 * percentage, // Direct value from original (for the second purple capsule)
        y: row2Y,
        width: 170 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "",
        color: colors.purple,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r2c3b",
        shape: "circle",
        // X position calculated for circle center relative to its intended top-left spot
        // Original used 762 directly, assuming it was already calculated for center or near-center
        x: 762 * percentage, // Calculation inline (using original value, assuming it accounts for center)
        y: row2Y, // Note: Physics engine might treat Y as center for circles
        width: circleDiameter * percentage,
        height: circleDiameter * percentage,
        text: "",
        color: colors.red,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r2c3c",
        shape: "capsule",
        x: 870 * percentage, // Direct value from original
        y: row2Y,
        // Width/Height values from original - appears to be a rotated or thin capsule
        width: capsuleHeight * percentage, // Using capsuleHeight as width based on original
        height: smallCapsuleHeight * percentage, // Specific smaller height
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r2c4",
        shape: "capsule",
        x: 1070 * percentage, // Direct value from original
        y: row2Y,
        width: 285 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "DREAM",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.white,
    },
    {
        id: "r2c5",
        shape: "capsule",
        x: 1335 * percentage, // Direct value from original
        y: row2Y,
        width: 235 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "JOB.",
        color: colors.purple,
        textSize: fontSize,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.red,
    },

    // --- Row 3 ---
    {
        id: "r3c1",
        shape: "capsule",
        x: 105 * percentage, // Direct value from original
        y: row3Y,
        width: 185 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "IT",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.red,
    },
    {
        id: "r3c2a",
        shape: "capsule",
        x: 300 * percentage, // Direct value from original
        y: row3Y,
        width: 190 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "",
        color: colors.lightPurple,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r3c2b",
        shape: "circle",
        // X position calculated for circle center relative to its intended top-left spot
        x: (397 + circleDiameter / 2) * percentage, // Calculation inline (original formula)
        y: row3Y, // Note: Physics engine might treat Y as center for circles
        width: circleDiameter * percentage,
        height: circleDiameter * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r3c3",
        shape: "capsule",
        x: 670 * percentage, // Direct value from original
        y: row3Y,
        width: 340 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "DOESN'T",
        color: colors.red,
        textSize: fontSize,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.yellow,
    },
    { // Renamed ID from r3c4 to r3c4a for consistency
        id: "r3c4a",
        shape: "capsule",
        x: 940 * percentage, // Direct value from original
        y: row3Y,
        width: 180 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    { // Corrected ID from r3c2b to r3c4b
        id: "r3c4b",
        shape: "circle",
        // X position calculated for circle center relative to its intended top-left spot
        x: (1032 + circleDiameter / 2) * percentage, // Calculation inline (original formula)
        y: row3Y, // Note: Physics engine might treat Y as center for circles
        width: circleDiameter * percentage,
        height: circleDiameter * percentage,
        text: "",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        secondaryColor: colors.white,
    },
    {
        id: "r3c5",
        shape: "capsule",
        x: 1280 * percentage, // Direct value from original
        y: row3Y,
        width: 280 * percentage, // Specific width
        height: capsuleHeight * percentage,
        text: "EXIST.",
        color: colors.white,
        options: { render: { strokeStyle: colors.black, lineWidth: lineWidth } },
        textSize: fontSize,
        secondaryColor: colors.red,
    },
];