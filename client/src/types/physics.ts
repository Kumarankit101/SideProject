// src/types/physics.ts
import Matter from 'matter-js';

export interface CapsuleData {
    id: string; // Unique identifier
    x: number;
    y: number;
    width: number; // Width for rectangle/capsule, Diameter for circle
    height: number; // Height for rectangle/capsule (ignored for circle)
    text?: string; // Make text optional for shapes without text
    color: string; // Hex color or 'transparent'
    shape?: 'capsule' | 'circle'; // Specify the shape type
    options?: Matter.IBodyDefinition; // Optional Matter.js specific overrides
    textSize?: number;
    secondaryColor: string// Size of the text (ignored for shapes without text)
}

// Extend Matter's Body type to include our custom data
declare module 'matter-js' {
    interface Body {
        customData?: {
            text?: string;
            color: string;
            secondaryColor: string;
            textSize?: number;
            id: string;
            originalWidth?: number; // Store original dims if needed
            originalHeight?: number;
        };
    }
}