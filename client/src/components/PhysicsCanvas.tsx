// src/components/PhysicsCanvas.tsx
import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { CapsuleData } from "../types/physics";
import { capsuleHeight } from "@/constants/constants";

interface PhysicsCanvasProps {
  capsules: CapsuleData[];
  width: number;
  height: number;
}

const PhysicsCanvas: React.FC<PhysicsCanvasProps> = ({
  capsules,
  width,
  height,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const textRenderFuncRef = useRef<(() => void) | null>(null);
  // const selectedCapsuleRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events;

    const devicePixelRatio = window.devicePixelRatio || 1;
    // const canvasWidth = width * devicePixelRatio;
    // const canvasHeight = height * devicePixelRatio;

    engineRef.current = Engine.create();
    const engine = engineRef.current;
    engine.world.gravity.y = 0; // Initially disable gravity

    setTimeout(() => {
      if (engineRef.current) {
        engineRef.current.world.gravity.y = 1.5; // Standard gravity
        console.log("Gravity enabled");
      }
    }, 1000);

    renderRef.current = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
        pixelRatio: devicePixelRatio,
        hasBounds: true,
      },
    });
    const render = renderRef.current;

    // Set the canvas style width and height to the original dimensions
    render.canvas.style.width = `${width}px`;
    render.canvas.style.height = `${height}px`;

    runnerRef.current = Runner.create();
    const runner = runnerRef.current;

    // Add mousemove event listener
    // const handleMouseMove = (event: MouseEvent) => {
    //   const { clientX, clientY } = event;
    //   const rect = renderRef.current?.canvas.getBoundingClientRect();

    //   if (rect) {
    //     // Check if mouse is outside the canvas
    //     if (
    //       clientX < rect.left ||
    //       clientX > rect.right ||
    //       clientY < rect.top ||
    //       clientY > rect.bottom
    //     ) {
    //       if (selectedCapsuleRef.current) {
    //         console.log("Deselecting capsule");
    //         selectedCapsuleRef.current = null; // Deselect the capsule
    //       }
    //     }
    //   }
    // };

    // window.addEventListener("mousemove", handleMouseMove);

    // Add mouse down event listener to select a capsule
    // const handleMouseDown = (event: MouseEvent) => {
    //   const mousePosition = { x: event.clientX, y: event.clientY };
    //   const bodies = Composite.allBodies(engine.world);

    //   for (const body of bodies) {
    //     if (Matter.Bounds.contains(body.bounds, mousePosition)) {
    //       selectedCapsuleRef.current = body;
    //       console.log("Capsule selected:", body.label);
    //       break;
    //     }
    //   }
    // };

    // window.addEventListener("mousedown", handleMouseDown);

    // --- Boundaries (make invisible by removing render options or setting strokeStyle='transparent') ---
    const wallThickness = 100; // Keep them thick for reliability but make invisible
    const boundaryOptions: Matter.IBodyDefinition = {
      isStatic: true,
      render: {
        visible: false, // Make walls invisible
      },
    };
    const ground = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2 - 5,
      width + wallThickness * 2,
      wallThickness,
      boundaryOptions
    );
    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      boundaryOptions
    );
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      boundaryOptions
    );
    const topWall = Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width + wallThickness * 2,
      wallThickness,
      boundaryOptions
    );

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // --- Create Capsules & Circles ---
    const capsuleBodies = capsules.map((cap) => {
      let body: Matter.Body;
      const isWhite = cap.color.toLowerCase() === "#ffffff";

      // Default physics properties
      const commonOptions: Matter.IBodyDefinition = {
        friction: 0.1, // Slightly more friction
        frictionAir: 0.01, // Slightly more damping
        restitution: 0.5, // Slightly less bouncy
        density: 0.0015, // Slightly denser
      };

      // Default render properties - apply border if white
      const renderOptions: Matter.IChamferableBodyDefinition["render"] = {
        fillStyle: cap.color,
        strokeStyle: isWhite ? "#000000" : cap.color, // Black border only if white fill
        lineWidth: isWhite ? 2 : 0,
      };

      // Merge common, specific render, and cap.options
      const finalOptions = {
        ...commonOptions,
        ...cap.options, // Merge cap.options first
        render: {
          ...renderOptions, // Then apply renderOptions to ensure they take precedence
          ...cap.options?.render, // Finally, apply any specific render options from cap.options
        },
      };
      if (cap.shape === "circle") {
        body = Bodies.circle(
          cap.x,
          cap.y,
          cap.width / 2, // Use width as diameter
          {
            ...finalOptions,
            label: `circle-${cap.id}`,
          }
        );
      } else {
        // Default to capsule
        body = Bodies.rectangle(cap.x, cap.y, cap.width, cap.height, {
          ...finalOptions,
          chamfer: { radius: Math.min(cap.width, cap.height) * 0.5 }, // Increased chamfer radius for smoother corners
          label: `capsule-${cap.id}`,
        });
      }

      // Attach custom data
      body.customData = {
        text: cap.text,
        color: cap.color,
        secondaryColor: cap.secondaryColor,
        textSize: cap.textSize, // Store original color for text contrast check
        id: cap.id,
        originalWidth: cap.width,
        originalHeight: cap.height,
      };
      return body;
    });

    Composite.add(engine.world, capsuleBodies);

    const handleMouseDown = (event: MouseEvent) => {
      const mousePosition = {
        x: event.clientX,
        y: event.clientY - capsuleHeight,
      };
      const bodies = Composite.allBodies(engine.world);

      for (const body of bodies) {
        if (Matter.Bounds.contains(body.bounds, mousePosition)) {
          const customData = body.customData;
          if (customData) {
            // Toggle color
            const currentColor = customData.color;
            customData.color =
              currentColor === customData.secondaryColor
                ? customData.color
                : customData.secondaryColor;
            body.render.fillStyle = customData.color; // Update the fill style
            console.log("Capsule color toggled:", body.label);
          }
          break;
        }
      }
    };

    window.addEventListener("mousedown", handleMouseDown);

    // --- Mouse Control (keep as is) ---
    const mouse = Mouse.create(render.canvas);
    mouseConstraintRef.current = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraintRef.current);
    render.mouse = mouse;

    // --- Custom Text Rendering (Adjust font size and color logic) ---
    const renderText = () => {
      const context = render.context;
      const allBodies = Composite.allBodies(engine.world);

      context.save();
      context.textAlign = "center";
      context.textBaseline = "middle";

      allBodies.forEach((body) => {
        // Render text only for bodies that have text defined in customData
        if (body.customData?.text && body.label.startsWith("capsule-")) {
          const { text, textSize } = body.customData;
          const { x, y } = body.position;

          // Determine text color: Black for light backgrounds, White for dark
          // Simple check using includes - could be improved with a proper lightness calculation
          context.fillStyle = "#000000"; // Black text on light, white on dark

          context.save();
          context.translate(x, y);
          context.rotate(body.angle); // Counter-rotate text
          context.font = `bold ${textSize || 18}px myfont`; // Use myfont as the font family
          context.fillText(text, 0, 2);
          context.restore();
        }
      });
      context.restore();
    };
    textRenderFuncRef.current = renderText;

    Events.on(render, "afterRender", textRenderFuncRef.current);

    // --- Start Simulation ---
    Runner.run(runner, engine);
    Render.run(render);

    // --- Cleanup (keep as is) ---
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      // window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("mousedown", handleMouseDown);
      console.log("Cleaning up Matter.js instance");
      if (renderRef.current) Render.stop(renderRef.current);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (mouseConstraintRef.current?.mouse) {
        Mouse.clearSourceEvents(mouseConstraintRef.current.mouse);
      }
      if (renderRef.current && textRenderFuncRef.current) {
        Events.off(renderRef.current, "afterRender", textRenderFuncRef.current);
      }
      if (engineRef.current) {
        Composite.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
      if (renderRef.current?.canvas) {
        renderRef.current.canvas.remove();
      }
      engineRef.current = null;
      renderRef.current = null;
      runnerRef.current = null;
      mouseConstraintRef.current = null;
      textRenderFuncRef.current = null;
    };
  }, [width, height]); // Keep dependencies minimal

  // Canvas container div - remove internal border if outer container has one
  return (
    <div
      ref={sceneRef}
      style={{
        marginTop: "20px",
        width: width,
        height: height,
        borderLeft: "2px solid #DDF695",
        borderRight: "2px solid #DDF695",
        // borderBottom: "2px solid #DDF695",
        borderRadius: "20px 20px 40px 40px", // Rounded
        overflow: "hidden",
        // background: "#000000",
        position: "relative",
      }}
      className="relative"
    />
  );
};

export default PhysicsCanvas;
